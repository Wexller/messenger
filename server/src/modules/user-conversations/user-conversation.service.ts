import { UserConversation } from './user-conversation.entity';

export class UserConversationService {
  async updateLastReadMessage(userId: string, conversationId: string, messageId: string): Promise<boolean> {
    await UserConversation.update(
      {
        lastReadMessageId: messageId,
      },
      {
        where: {
          userId,
          conversationId,
        },
      },
    );

    return true;
  }
}

export const userConversationService = new UserConversationService();
