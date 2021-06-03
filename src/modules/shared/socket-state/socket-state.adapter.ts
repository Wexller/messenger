import { INestApplicationContext, WebSocketAdapter } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import socketIo from 'socket.io';
import { ConversationsService } from '../../conversations/conversations.service';

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
    private readonly conversationService: ConversationsService,
  ) {
    super(app);
  }

  public create(port: number, options: object = {}): socketIo.Server {
    const server = super.createIOServer(port, options);
    this.redisPropagatorService.injectSocketServer(server);

    server.use(async (socket: AuthenticatedSocket, next) => {
      const token = socket.handshake.query?.token || socket.handshake.headers?.authorization;

      if (!token) {
        socket.auth = null;

        // not authenticated connection is still valid
        // thus no error
        return next();
      }

      try {
        // fake auth
        socket.auth = {
          userId: 'f13736cc-f8fb-4e91-8078-1104b55c5936',
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
