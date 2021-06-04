import { UserConversation } from './user-conversation.entity';
import { USER_CONVERSATION_REPOSITORY } from '../../core/constants';

export const userConversationProviders = [
  {
    provide: USER_CONVERSATION_REPOSITORY,
    useValue: UserConversation,
  },
];
