import { UserConversations } from './user-conversations.entity';
import { USER_CONVERSATION_REPOSITORY } from '../../core/constants';

export const associationsProviders = [
  {
    provide: USER_CONVERSATION_REPOSITORY,
    useValue: UserConversations,
  },
];
