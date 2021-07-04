import * as sequelize from 'sequelize';
import { FindOptions, Op, QueryTypes } from 'sequelize';
import { MESSAGE_DEFAULT_LIMIT, MESSAGE_DEFAULT_SUB_LIMIT } from './message.constants';
import { conversationService } from '../conversation/conversation.service';
import { UserConversation } from '../user-conversations/user-conversation.entity';
import { userConversationService } from '../user-conversations/user-conversation.service';
import { Message } from './message.entity';

class MessageService {
  async newMessage(conversationId: string, userId: string, text: string): Promise<Message> {
    const newMessage = await Message.create({
      conversationId,
      userId,
      text,
    });

    await conversationService.updateFirstAndLastMessages(conversationId, newMessage.id);
    await userConversationService.updateLastReadMessage(newMessage.userId, newMessage.conversationId, newMessage.id);

    return newMessage;
  }

  async getMessageInfo(messageId): Promise<Message> {
    return await Message.findByPk(messageId);
  }

  async getMessagesInConversation(conversationId: string, userId: string): Promise<Message[]> {
    const message = await MessageService.getLastReadMessage(conversationId, userId);

    if (!message) {
      return [];
    }

    const { createdAt: lastReadMessageAt } = message;

    const { allMessagesCount, unreadMessagesCount } = await MessageService.getUserMessagesCount(
      lastReadMessageAt,
      conversationId,
    );
    const readMessagesCount = allMessagesCount - unreadMessagesCount;

    if (+allMessagesCount === 0) {
      return [];
    }

    if (allMessagesCount === unreadMessagesCount) {
      return await MessageService.getMessagesFromBegin(conversationId);
    }

    if (+unreadMessagesCount === 0) {
      return await MessageService.getMessagesFromEnd(conversationId);
    }

    let readMessagesLimit = MESSAGE_DEFAULT_SUB_LIMIT;
    let unreadMessagesLimit = MESSAGE_DEFAULT_SUB_LIMIT;

    if (unreadMessagesCount > MESSAGE_DEFAULT_SUB_LIMIT && readMessagesCount < MESSAGE_DEFAULT_SUB_LIMIT) {
      unreadMessagesLimit = MESSAGE_DEFAULT_LIMIT - readMessagesCount;
      readMessagesLimit = readMessagesCount;
    }

    if (unreadMessagesCount < MESSAGE_DEFAULT_SUB_LIMIT && readMessagesCount > MESSAGE_DEFAULT_SUB_LIMIT) {
      readMessagesLimit = MESSAGE_DEFAULT_LIMIT - unreadMessagesCount;
      unreadMessagesLimit = unreadMessagesCount;
    }

    if (unreadMessagesCount < MESSAGE_DEFAULT_SUB_LIMIT && readMessagesCount < MESSAGE_DEFAULT_SUB_LIMIT) {
      readMessagesLimit = readMessagesCount;
      unreadMessagesLimit = unreadMessagesCount;
    }

    return await MessageService.getReadAndUnreadMessages(
      conversationId,
      lastReadMessageAt,
      readMessagesLimit,
      unreadMessagesLimit,
    );
  }

  async getOldMessagesInConversation(conversationId: string, messageId: string): Promise<Message[]> {
    const message = await this.getMessageInfo(messageId);

    if (!message) {
      return [];
    }

    const messagesQuery = MessageService.selectQuery({
      where: {
        conversationId,
        createdAt: {
          [Op.lt]: message.createdAt,
        },
      },
      limit: MESSAGE_DEFAULT_LIMIT,
      order: [['createdAt', 'DESC']],
    });

    const query = `SELECT * FROM (${messagesQuery}) AS "M" ORDER BY "createdAt"`;

    return await Message.sequelize.query(query, { model: Message });
  }

  async getNewMessagesInConversation(conversationId: string, messageId: string): Promise<Message[]> {
    const message = await this.getMessageInfo(messageId);

    if (!message) {
      return [];
    }

    return await Message.findAll({
      where: {
        conversationId,
        createdAt: {
          [Op.gt]: message.createdAt,
        },
      },
      limit: MESSAGE_DEFAULT_LIMIT,
    });
  }

  private static async getLastReadMessage(conversationId: string, userId: string): Promise<Message> {
    const userConversationQuery = MessageService.selectQuery(
      {
        where: {
          userId,
          conversationId,
        },
        attributes: ['lastReadMessageId'],
      },
      UserConversation.tableName,
    );

    return await Message.findOne({
      where: sequelize.literal(`"Message"."id" = (${userConversationQuery})`),
    });
  }

  private static async getUserMessagesCount(
    lastReadMessageAt: Date,
    conversationId: string,
  ): Promise<{ allMessagesCount: string; unreadMessagesCount: string } | any> {
    const messagesCountSubQuery = `SELECT COUNT(*) AS "allMessagesCount" FROM "${Message.tableName}" WHERE "conversationId" = $2`;
    const unreadMessagesCountSubQuery = `SELECT COUNT(*) AS "unreadMessagesCount" FROM "${Message.tableName}" WHERE "createdAt" > $1 AND "conversationId" = $2`;
    const fullCountQuery = `SELECT * FROM (${messagesCountSubQuery}) AS "M1" CROSS JOIN (${unreadMessagesCountSubQuery}) AS "M2"`;

    const [recordCounts] = await Message.sequelize.query(fullCountQuery, {
      type: QueryTypes.SELECT,
      bind: [lastReadMessageAt, conversationId],
    });

    return recordCounts;
  }

  private static async getReadAndUnreadMessages(
    conversationId: string,
    lastReadMessageAt: Date,
    readMessagesLimit: number,
    unreadMessagesLimit: number,
  ): Promise<Message[]> {
    const readMessagesQuery = MessageService.selectQuery({
      where: {
        createdAt: {
          [Op.lte]: lastReadMessageAt,
        },
        conversationId,
      },
      order: [['createdAt', 'DESC']],
      limit: readMessagesLimit,
    });

    const unreadMessagesQuery = MessageService.selectQuery({
      where: {
        createdAt: {
          [Op.gt]: lastReadMessageAt,
        },
        conversationId,
      },
      order: [['createdAt', 'ASC']],
      limit: unreadMessagesLimit,
    });

    const resultQuery = `SELECT * FROM ((${readMessagesQuery}) UNION (${unreadMessagesQuery})) AS "M" ORDER BY "createdAt"`;

    return await Message.sequelize.query(resultQuery, {
      model: Message,
    });
  }

  private static async getMessagesFromBegin(conversationId: string): Promise<Message[]> {
    return await Message.findAll({
      where: {
        conversationId,
      },
      limit: 20,
      order: [['createdAt', 'ASC']],
    });
  }

  private static async getMessagesFromEnd(conversationId: string): Promise<Message[]> {
    const messagesQuery = MessageService.selectQuery({
      where: {
        conversationId,
      },
      limit: 20,
      order: [['createdAt', 'DESC']],
    });

    const query = `SELECT * FROM (${messagesQuery}) AS "M" ORDER BY "createdAt"`;

    return await Message.sequelize.query(query, { model: Message });
  }

  private static selectQuery(
    findOption: FindOptions,
    tableName: string = Message.tableName,
    semi: boolean = false,
  ): string {
    const queryGenerator = Message.sequelize.getQueryInterface().queryGenerator;
    // @ts-ignore
    const query = queryGenerator.selectQuery(tableName, findOption);

    if (!semi) {
      return query.replace(';', '');
    }

    return query;
  }
}

export const messageService = new MessageService();
