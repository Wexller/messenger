import { Conversation } from '../../modules/conversation/conversation.entity';
import { Friend } from '../../modules/friend/friend.entity';
import { Message } from '../../modules/message/message.entity';
import { Token } from '../../modules/token/token.entity';
import { UserConversation } from '../../modules/user-conversations/user-conversation.entity';
import { User } from '../../modules/user/user.entity';

export const databaseEntities = [User, Friend, Token, Conversation, UserConversation, Message];
