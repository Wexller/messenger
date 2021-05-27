import { Inject, Injectable } from '@nestjs/common';
import { MESSAGE_REPOSITORY } from '../../core/constants';
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

  async getMessagesInConversation(
    messagesGet: MessagesGetDto,
  ): Promise<Message[]> {
    return await this.messageRepository.findAll({
      where: {
        user_id: messagesGet.user_id,
        conversation_id: messagesGet.conversation_id,
      },
    });
  }
}
