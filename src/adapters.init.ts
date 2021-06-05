import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConversationService } from './modules/conversation/conversation.service';

import { RedisPropagatorService } from './modules/shared/redis-propagator/redis-propagator.service';
import { SocketStateAdapter } from './modules/shared/socket-state/socket-state.adapter';
import { SocketStateService } from './modules/shared/socket-state/socket-state.service';

export const initAdapters = (app: INestApplication): INestApplication => {
  const socketStateService = app.get(SocketStateService);
  const redisPropagatorService = app.get(RedisPropagatorService);
  const conversationService = app.get(ConversationService);
  const jwtService = app.get(JwtService);

  app.useWebSocketAdapter(
    new SocketStateAdapter(app, socketStateService, redisPropagatorService, conversationService, jwtService),
  );

  return app;
};
