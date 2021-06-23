import { User } from '../user/user.entity';
import { userService } from '../user/user.service';
import { CONVERSATION_TYPES } from './conversation.constants';
import { Conversation } from './conversation.entity';
import { IConversation } from './interfaces/conversation.interface';

class ConversationService {
  async getInfo(id: string): Promise<Conversation> {
    return await Conversation.findOne({
      include: {
        model: User,
      },
      where: { id },
    });
  }

  async createPrivate(userIds: string[]): Promise<Conversation> {
    const users = await userService.getUsers(userIds);

    const name = users.map((user) => user.username).join(' - ');

    const conversation = await Conversation.create({
      type: CONVERSATION_TYPES.PRIVATE,
      name,
    });

    await conversation.$add('users', users);

    return conversation;
  }

  async startPrivate(requestedUserId: string, targetUserId: string): Promise<IConversation> {
    const userIds = [requestedUserId, targetUserId];
    const conversations = await ConversationService.getUsersPrivateConversations(userIds);

    let conversation;

    if (conversations && conversations.length) {
      const numberOfUserRecords = 2;
      conversation = conversations.find((item) => item.users.length === numberOfUserRecords);
    }

    if (!conversation) {
      const newConversation = await this.createPrivate(userIds);
      conversation = await this.getInfo(newConversation.id);
    }

    const lastReadMessageId = conversation.users.find((user) => user.id === requestedUserId).UserConversation
      .lastReadMessageId;

    return {
      id: conversation.id,
      name: conversation.name,
      type: conversation.type,
      lastReadMessageId: lastReadMessageId ?? null,
      firstMessageId: conversation.firstMessageId,
      lastMessageId: conversation.lastMessageId,
      users: conversation.users.map((user) => ({
        id: user.id,
        name: user.name,
        username: user.username,
      })),
    };
  }

  private static async getUsersPrivateConversations(users: string[]): Promise<Conversation[]> {
    return await Conversation.findAll({
      include: {
        model: User,
      },
      where: {
        type: CONVERSATION_TYPES.PRIVATE,
        '$users.id$': users,
      },
    });
  }
}

export const conversationService = new ConversationService();
