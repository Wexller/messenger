import { INestApplication } from '@nestjs/common';
import { ConversationService } from './modules/conversation/conversation.service';

import { RedisPropagatorService } from './modules/shared/redis-propagator/redis-propagator.service';
import { SocketStateAdapter } from './modules/shared/socket-state/socket-state.adapter';
import { SocketStateService } from './modules/shared/socket-state/socket-state.service';

export const initAdapters = (app: INestApplication): INestApplication => {
  const socketStateService = app.get(SocketStateService);
  const redisPropagatorService = app.get(RedisPropagatorService);
  const conversationService = app.get(ConversationService);

  app.useWebSocketAdapter(new SocketStateAdapter(app, socketStateService, redisPropagatorService, conversationService));

  return app;
};
