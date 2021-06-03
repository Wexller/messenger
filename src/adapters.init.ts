import { INestApplication } from '@nestjs/common';
import { ConversationsService } from './modules/conversations/conversations.service';

import { RedisPropagatorService } from './modules/shared/redis-propagator/redis-propagator.service';
import { SocketStateAdapter } from './modules/shared/socket-state/socket-state.adapter';
import { SocketStateService } from './modules/shared/socket-state/socket-state.service';

export const initAdapters = (app: INestApplication): INestApplication => {
  const socketStateService = app.get(SocketStateService);
  const redisPropagatorService = app.get(RedisPropagatorService);
  const conversationService = app.get(ConversationsService);

  app.useWebSocketAdapter(new SocketStateAdapter(app, socketStateService, redisPropagatorService, conversationService));

  return app;
};
