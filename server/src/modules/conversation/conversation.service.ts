import * as sequelize from 'sequelize';
import { Op } from 'sequelize';
import { Message } from '../message/message.entity';
import { UserConversation } from '../user-conversations/user-conversation.entity';
import { User } from '../user/user.entity';
import { userService } from '../user/user.service';
import { CONVERSATION_TYPES } from './conversation.constants';
import { Conversation } from './conversation.entity';
import { IConversation } from './interfaces/conversation.interface';

class ConversationService {
  async getAll(userId: string): Promise<IConversation[]> {
    const conversations = await Conversation.findAll({
      attributes: {
        include: [
          [sequelize.literal(ConversationService.messageInfoQuery('createdAt')), 'lastMessageAt'],
          [sequelize.literal(ConversationService.messageInfoQuery('text')), 'lastMessageText'],
        ],
      },
      include: { model: User },
      order: [[sequelize.literal('"lastMessageAt"'), 'DESC']],
      where: {
        id: { [Op.in]: sequelize.literal(ConversationService.userConversationsQuery()) },
      },
      bind: [userId],
    });

    return conversations.map((conversation) =>
      ConversationService.transformConversationInfo(conversation, userId, ['lastMessageAt', 'lastMessageText']),
    );
  }

  async getConversationById(id: string): Promise<Conversation> {
    return await Conversation.findByPk(id, {
      include: {
        model: User,
      },
    });
  }

  async getConversationInfo(id: string, userId: string): Promise<IConversation> {
    const conversation = await this.getConversationById(id);

    return ConversationService.transformConversationInfo(conversation, userId);
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
      conversation = await this.getConversationById(newConversation.id);
    }

    return ConversationService.transformConversationInfo(conversation, requestedUserId);
  }

  private static messageInfoQuery(column: string): string {
    return `(SELECT "${column}" FROM "${Message.tableName}" AS message WHERE message."conversationId" = "Conversation"."id" ORDER BY message."createdAt" DESC LIMIT 1)`;
  }

  private static userConversationsQuery(): string {
    return `(SELECT "C"."id"
            FROM "${Conversation.tableName}" "C"
                     LEFT OUTER JOIN "${UserConversation.tableName}" "UC" ON "C".id = "UC"."conversationId"
                     LEFT OUTER JOIN "${User.tableName}" "U" ON "UC"."userId" = "U".id
            WHERE "U"."id" = $1)`;
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

  private static transformConversationInfo(
    conversation: Conversation,
    userId: string,
    properties: string[] = [],
  ): IConversation {
    const lastReadMessageId = conversation.users.find((user) => user.id === userId)['UserConversation']
      .lastReadMessageId;

    const additionalProperties = {};
    for (const property of properties) {
      if (conversation.getDataValue(property) !== undefined) {
        additionalProperties[property] = conversation.getDataValue(property);
      }
    }

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
      ...additionalProperties,
    };
  }
}

export const conversationService = new ConversationService();
