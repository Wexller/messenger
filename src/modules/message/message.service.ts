import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { FindOptions, Op, QueryTypes } from 'sequelize';
import { ConversationService } from '../conversation/conversation.service';
import { RedisPropagatorService } from '../shared/redis-propagator/redis-propagator.service';
import { UserConversationService } from '../user-conversation/user-conversation.service';
import { MessageCreateDto } from './dto/message-create.dto';
import { MessagesGetDto } from './dto/messages-get.dto';
import { MessagesLoadDto } from './dto/messages-load.dto';
import { MessagesReadUnreadGetDto } from './dto/messages-read-unread-get.dto';
import { MESSAGE_DEFAULT_LIMIT, MESSAGE_DEFAULT_SUB_LIMIT, MESSAGE_REPOSITORY } from './message.constants';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: typeof Message,
    private readonly redisPropagatorService: RedisPropagatorService,
    private readonly userConversationService: UserConversationService,
    @Inject(forwardRef(() => ConversationService))
    private readonly conversationService: ConversationService,
  ) {}

  async create(message: MessageCreateDto): Promise<Message> {
    const newMessage = await this.messageRepository.create<Message>(message);

    await this.userConversationService.updateLastReadMessage({
      userId: newMessage.userId,
      conversationId: newMessage.conversationId,
      messageId: newMessage.id,
      lastReadMessageAt: newMessage.createdAt,
    });

    await this.conversationService.updateFirstAndLastMessages({
      conversationId: newMessage.conversationId,
      messageId: newMessage.id,
    });

    this.redisPropagatorService.emitToConversation({
      conversationId: newMessage.conversationId,
      event: 'newMessage',
      data: newMessage,
    });

    return newMessage;
  }

  async getMessageInfo(messageId): Promise<Message> {
    return await this.messageRepository.findByPk(messageId);
  }

  async getMessagesInConversation({ conversationId, userId }: MessagesGetDto): Promise<Message[]> {
    const message = await this.userConversationService.findLastReadMessage({
      userId,
      conversationId,
    });

    if (!message) {
      return [];
    }

    const { lastReadMessageAt } = message;

    const { allMessagesCount, unreadMessagesCount } = await this.getUserMessagesCount(
      lastReadMessageAt,
      conversationId,
    );
    const readMessagesCount = allMessagesCount - unreadMessagesCount;

    if (+allMessagesCount === 0) {
      return [];
    }

    if (allMessagesCount === unreadMessagesCount) {
      return await this.getMessagesFromBegin(conversationId);
    }

    if (+unreadMessagesCount === 0) {
      return await this.getMessagesFromEnd(conversationId);
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

    return await this.getReadAndUnreadMessages({
      lastReadMessageAt,
      conversationId,
      readMessagesLimit,
      unreadMessagesLimit,
    });
  }

  async getOldMessagesInConversation({ conversationId, messageId }: MessagesLoadDto): Promise<Message[]> {
    const message = await this.getMessageInfo(messageId);

    if (!message) {
      return [];
    }

    const messagesQuery = this.selectQuery({
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

    return await this.messageRepository.sequelize.query(query, { model: Message });
  }

  async getNewMessagesInConversation({ conversationId, messageId }: MessagesLoadDto): Promise<Message[]> {
    const message = await this.getMessageInfo(messageId);

    if (!message) {
      return [];
    }

    return await this.messageRepository.findAll({
      where: {
        conversationId,
        createdAt: {
          [Op.gt]: message.createdAt,
        },
      },
      limit: MESSAGE_DEFAULT_LIMIT,
    });
  }

  private async getUserMessagesCount(
    lastReadMessageAt: Date,
    conversationId: string,
  ): Promise<{ allMessagesCount: string; unreadMessagesCount: string } | any> {
    const messagesCountSubQuery = `SELECT COUNT(*) AS "allMessagesCount" FROM "${Message.tableName}" WHERE "conversationId" = $2`;
    const unreadMessagesCountSubQuery = `SELECT COUNT(*) AS "unreadMessagesCount" FROM "${Message.tableName}" WHERE "createdAt" > $1 AND "conversationId" = $2`;
    const fullCountQuery = `SELECT * FROM (${messagesCountSubQuery}) AS "M1" CROSS JOIN (${unreadMessagesCountSubQuery}) AS "M2"`;

    const [recordCounts] = await this.messageRepository.sequelize.query(fullCountQuery, {
      type: QueryTypes.SELECT,
      bind: [lastReadMessageAt, conversationId],
    });

    return recordCounts;
  }

  private async getReadAndUnreadMessages({
    lastReadMessageAt,
    conversationId,
    readMessagesLimit,
    unreadMessagesLimit,
  }: MessagesReadUnreadGetDto): Promise<Message[]> {
    const readMessagesQuery = this.selectQuery({
      where: {
        createdAt: {
          [Op.lte]: lastReadMessageAt,
        },
        conversationId,
      },
      order: [['createdAt', 'DESC']],
      limit: readMessagesLimit,
    });

    const unreadMessagesQuery = this.selectQuery({
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

    return await this.messageRepository.sequelize.query(resultQuery, {
      model: Message,
    });
  }

  private async getMessagesFromBegin(conversationId: string): Promise<Message[]> {
    return await this.messageRepository.findAll({
      where: {
        conversationId,
      },
      limit: 20,
      order: [['createdAt', 'ASC']],
    });
  }

  private async getMessagesFromEnd(conversationId: string): Promise<Message[]> {
    const messagesQuery = this.selectQuery({
      where: {
        conversationId,
      },
      limit: 20,
      order: [['createdAt', 'DESC']],
    });

    const query = `SELECT * FROM (${messagesQuery}) AS "M" ORDER BY "createdAt"`;

    return await this.messageRepository.sequelize.query(query, { model: Message });
  }

  private selectQuery(findOption: FindOptions, semi = false): string {
    const queryGenerator = this.messageRepository.sequelize.getQueryInterface().queryGenerator;
    // @ts-ignore
    const query = queryGenerator.selectQuery(Message.tableName, findOption);

    if (!semi) {
      return query.replace(';', '');
    }

    return query;
  }
}
