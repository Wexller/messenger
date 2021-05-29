import { Inject, Injectable } from '@nestjs/common';
import { CONVERSATION_REPOSITORY, CONVERSATION_TYPES } from '../../core/constants';
import { User } from '../users/user.entity';
import { Conversation } from './conversation.entity';
import { ConversationDto } from './dto/conversation.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class ConversationsService {
  constructor(
    @Inject(CONVERSATION_REPOSITORY)
    private readonly conversationRepository: typeof Conversation,
    private readonly userService: UsersService,
  ) {}

  async create(conversation: ConversationDto, users: User[]): Promise<Conversation> {
    const newConversation = await this.conversationRepository.create<Conversation>(conversation);

    await newConversation.$add('users', users);

    return newConversation;
  }

  async createGeneral(name: string, users: User[]): Promise<Conversation> {
    return await this.create({ type: CONVERSATION_TYPES.GENERAL, name }, users);
  }

  async createPrivate(name: string, user1: User, user2: User): Promise<Conversation> {
    return await this.create({ type: CONVERSATION_TYPES.PRIVATE, name }, [user1, user2]);
  }

  async findAll(userId: string): Promise<Conversation[]> {
    return await this.conversationRepository.findAll<Conversation>({
      include: [{ model: User, as: 'users', through: { attributes: [] } }],
      where: { '$users.id$': userId },
    });
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

  async updateLastMessage(conversationId: string, message = 'Message'): Promise<[number, Conversation[]]> {
    return await this.conversationRepository.update(
      {
        last_message_text: message,
        last_message_at: new Date(),
      },
      { where: { id: conversationId } },
    );
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

  async startConversation({ requestedUser, targetUser }, { requestedUserRecord, targetUserRecord }): Promise<string> {
    const conversations = await this.getUsersConversation(requestedUser, targetUser);

    let conversationId = null;

    if (conversations && conversations.length) {
      const numberOfUsers = 2;
      const conversation = conversations.find((item) => item.users.length === numberOfUsers);

      if (conversation?.id) {
        conversationId = conversation.id;
      }
    }

    if (!conversationId) {
      const result = await this.createPrivate(targetUser, requestedUserRecord, targetUserRecord);

      conversationId = result.id;
    }

    return conversationId;
  }

  async getUsersConversation(user1: string, user2: string): Promise<Conversation[]> {
    return await this.conversationRepository.findAll({
      include: {
        model: User,
        through: {
          attributes: [],
        },
      },
      attributes: ['id'],
      where: {
        type: CONVERSATION_TYPES.PRIVATE,
        '$users.username$': [user1, user2],
      },
    });
  }
}
