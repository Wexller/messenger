import { CONVERSATION_REPOSITORY } from './conversation.constants';
import { Conversation } from './conversation.entity';

export const conversationsProviders = [
  {
    provide: CONVERSATION_REPOSITORY,
    useValue: Conversation,
  },
];
