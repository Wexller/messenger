import { Inject, Injectable } from '@nestjs/common';
import { MESSAGE_REPOSITORY } from '../../core/constants';
import { RedisPropagatorService } from '../shared/redis-propagator/redis-propagator.service';
import { User } from '../user/user.entity';
import { MessageCreateDto } from './dto/message-create.dto';
import { MessagesGetDto } from './dto/messages-get.dto';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: typeof Message,
    private readonly redisPropagatorService: RedisPropagatorService,
  ) {}

  async create(message: MessageCreateDto): Promise<Message> {
    const newMessage = await this.messageRepository.create<Message>(message);

    this.redisPropagatorService.emitToConversation({
      conversationId: newMessage.conversation_id,
      event: 'newMessage',
      data: newMessage,
    });

    return newMessage;
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
