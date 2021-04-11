import { Conversation } from './conversation.entity';
import { CONVERSATION_REPOSITORY } from '../../core/constants';

export const conversationsProviders = [
  {
    provide: CONVERSATION_REPOSITORY,
    useValue: Conversation,
  },
];
