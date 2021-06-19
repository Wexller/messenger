import { Inject, Injectable } from '@nestjs/common';
import { MessageService } from '../message/message.service';
import { CONVERSATION_REPOSITORY } from './conversation.constants';
import { User } from '../user/user.entity';
import { CONVERSATION_TYPES } from './conversation.constants';
import { Conversation } from './conversation.entity';
import { ConversationDto } from './dto/conversation.dto';
import { UserService } from '../user/user.service';
import { IConversation } from './IConversation';

@Injectable()
export class ConversationService {
  constructor(
    @Inject(CONVERSATION_REPOSITORY)
    private readonly conversationRepository: typeof Conversation,
    private readonly userService: UserService,
    private readonly messageService: MessageService,
  ) {}

  async create(conversation: ConversationDto, users: User[]): Promise<Conversation> {
    const newConversation = await this.conversationRepository.create<Conversation>(conversation);

    await newConversation.$add('users', users);

    return newConversation;
  }

  async createGeneral(name: string, users: User[]): Promise<Conversation> {
    return await this.create({ type: CONVERSATION_TYPES.GENERAL, name }, users);
  }

  async createPrivate(user1: User, user2: User): Promise<Conversation> {
    return await this.create({ type: CONVERSATION_TYPES.PRIVATE, name: `${user1.username} - ${user2.username}` }, [
      user1,
      user2,
    ]);
  }

  async findAll(userId: string): Promise<Conversation[]> {
    return await this.conversationRepository.findAll<Conversation>({
      include: [{ model: User, as: 'users', through: { attributes: [] } }],
      where: { '$users.id$': userId },
    });
  }

  async getUserConversationIds(userId: string) {
    const conversations = await this.findAll(userId);
    return conversations.map((c) => c.id);
  }

  async addUser(conversationId: string, username: string): Promise<boolean> {
    const conversation = await this.conversationRepository.findByPk(conversationId);

    if (!conversation) {
      return false;
    }

    const userToAdd = await this.userService.findOneByUsername(username);
    await conversation.$add('users', userToAdd);

    return true;
  }

  async updateFirstAndLastMessages({ conversationId: id, messageId }): Promise<[number, Conversation[]]> {
    const { firstMessageId } = await this.conversationRepository.findByPk(id);

    let values;

    if (firstMessageId) {
      values = { lastMessageId: messageId };
    } else {
      values = {
        firstMessageId: messageId,
        lastMessageId: messageId,
      };
    }

    return await this.conversationRepository.update(values, { where: { id } });
  }

  async remove(id: string): Promise<number> {
    return await this.conversationRepository.destroy({ where: { id } });
  }

  async findOneWithUser(userId: string, conversationId: string): Promise<Conversation> {
    return await this.conversationRepository.findOne({
      include: [User],
      where: { '$users.id$': userId, id: conversationId },
    });
  }

  async findOneById(id: string) {
    return await this.conversationRepository.findByPk(id, {
      include: {
        model: User,
        attributes: ['id', 'username', 'name'],
      },
      attributes: ['id', 'name', 'firstMessageId', 'lastMessageId'],
    });
  }

  async startConversation(
    { requestedUser, targetUser },
    { requestedUserRecord, targetUserRecord },
  ): Promise<IConversation> {
    const conversations = await this.getUsersConversation(requestedUser, targetUser);

    let conversation;

    if (conversations && conversations.length) {
      const numberOfUsers = 2;
      conversation = conversations.find((item) => item.users.length === numberOfUsers);
    }

    if (!conversation) {
      const created = await this.createPrivate(requestedUserRecord, targetUserRecord);
      conversation = await this.findOneById(created.id);
    }

    const lastReadMessageId = conversation.users.find((user) => user.id === requestedUserRecord.id).UserConversation
      .lastReadMessageId;

    return {
      id: conversation.id,
      name: conversation.name,
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

  async getUsersConversation(user1: string, user2: string): Promise<Conversation[]> {
    return await this.conversationRepository.findAll({
      include: {
        model: User,
        attributes: ['id', 'username', 'name'],
      },
      attributes: ['id', 'name', 'firstMessageId', 'lastMessageId'],
      where: {
        type: CONVERSATION_TYPES.PRIVATE,
        '$users.username$': [user1, user2],
      },
    });
  }
}
