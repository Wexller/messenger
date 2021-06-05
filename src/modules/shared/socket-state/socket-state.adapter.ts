import { INestApplicationContext, WebSocketAdapter } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';
import socketIo from 'socket.io';
import { ConversationService } from '../../conversation/conversation.service';

import { RedisPropagatorService } from '../redis-propagator/redis-propagator.service';

import { SocketStateService } from './socket-state.service';

interface TokenPayload {
  readonly userId: string;
}

export interface AuthenticatedSocket extends socketIo.Socket {
  auth: TokenPayload;
}

export class SocketStateAdapter extends IoAdapter implements WebSocketAdapter {
  public constructor(
    private readonly app: INestApplicationContext,
    private readonly socketStateService: SocketStateService,
    private readonly redisPropagatorService: RedisPropagatorService,
    private readonly conversationService: ConversationService,
    private readonly jwtService: JwtService,
  ) {
    super(app);
  }

  public create(port: number, options: object = {}): socketIo.Server {
    const server = super.createIOServer(port, options);
    this.redisPropagatorService.injectSocketServer(server);

    server.use(async (socket: AuthenticatedSocket, next) => {
      const authorization = socket.handshake.headers?.authorization;

      if (!authorization || !authorization.length || !authorization.includes('Bearer ')) {
        socket.auth = null;

        // not authenticated connection is still valid
        // thus no error
        return next();
      }

      try {
        const [, jwtToken] = authorization.split(' ');

        const user = this.jwtService.verify(jwtToken, {
          secret: process.env.JWTKEY,
        });

        socket.auth = {
          userId: user.id,
        };

        return next();
      } catch (e) {
        return next(e);
      }
    });

    return server;
  }

  public bindClientConnect(server: socketIo.Server, callback: Function): void {
    server.on('connection', (socket: AuthenticatedSocket) => {
      if (socket.auth) {
        this.conversationService.getUserConversationIds(socket.auth.userId).then((conversationIds) => {
          for (const id of conversationIds) {
            this.socketStateService.add(id, socket);
          }
        });

        socket.on('disconnect', () => {
          this.conversationService.getUserConversationIds(socket.auth.userId).then((conversationIds) => {
            for (const id of conversationIds) {
              this.socketStateService.remove(id, socket);
            }
          });

          socket.removeAllListeners('disconnect');
        });
      }

      callback(socket);
    });
  }
}
