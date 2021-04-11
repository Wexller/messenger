import { Inject, Injectable } from '@nestjs/common';
import { CONVERSATION_REPOSITORY } from '../../core/constants';
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

  async create(
    conversation: ConversationDto,
    user: User,
  ): Promise<Conversation> {
    const newConversation = await this.conversationRepository.create<Conversation>(
      conversation,
    );
    await newConversation.$add('users', user);

    return newConversation;
  }

  async findAll(userId: string): Promise<Conversation[]> {
    return await this.conversationRepository.findAll<Conversation>({
      include: [{ model: User, as: 'users', through: { attributes: [] } }],
      where: { '$users.id$': userId },
    });
  }

  async addUser(conversationId: string, username: string): Promise<boolean> {
    const conversation = await this.conversationRepository.findByPk(
      conversationId,
    );

    if (!conversation) {
      return false;
    }

    const userToAdd = await this.userService.findOneByUsername(username);
    await conversation.$add('users', userToAdd);

    return true;
  }

  async updateLastMessage(
    conversationId: string,
    message = 'Message',
  ): Promise<[number, Conversation[]]> {
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

  async findOneWithUser(
    userId: string,
    conversationId: string,
  ): Promise<Conversation> {
    return await this.conversationRepository.findOne({
      include: [User],
      where: { '$users.id$': userId, id: conversationId },
    });
  }
}
