import { Inject, Injectable } from '@nestjs/common';
import { MESSAGE_REPOSITORY } from './message.constants';
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
      conversationId: newMessage.conversationId,
      event: 'newMessage',
      data: newMessage,
    });

    return newMessage;
  }

  async getMessagesInConversation({ conversationId }: MessagesGetDto): Promise<Message[]> {
    return await this.messageRepository.findAll({
      where: {
        conversationId,
      },
      include: [User],
      order: [['createdAt', 'ASC']],
    });
  }
}
