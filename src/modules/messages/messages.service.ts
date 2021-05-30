import { Inject, Injectable } from '@nestjs/common';
import { MESSAGE_REPOSITORY } from '../../core/constants';
import { User } from '../users/user.entity';
import { MessageCreateDto } from './dto/message-create.dto';
import { MessagesGetDto } from './dto/messages-get.dto';
import { Message } from './message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: typeof Message,
  ) {}

  async create(message: MessageCreateDto): Promise<Message> {
    return await this.messageRepository.create<Message>(message);
  }

  async getMessagesInConversation({ conversation_id }: MessagesGetDto): Promise<Message[]> {
    return await this.messageRepository.findAll({
      where: {
        conversation_id,
      },
      include: [User],
      order: [['createdAt', 'ASC']],
    });
  }
}
