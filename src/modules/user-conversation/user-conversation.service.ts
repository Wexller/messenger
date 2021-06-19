import { Inject, Injectable } from '@nestjs/common';
import { USER_CONVERSATION_REPOSITORY } from './user-conversation.constants';
import { UserConversationDto } from './dto/user-conversation.dto';
import { UserConversation } from './user-conversation.entity';

@Injectable()
export class UserConversationService {
  constructor(
    @Inject(USER_CONVERSATION_REPOSITORY) private readonly userConversationRepository: typeof UserConversation,
  ) {}

  async updateLastReadMessage({
    userId,
    conversationId,
    messageId,
    lastReadMessageAt,
  }: UserConversationDto): Promise<{ messageId: string; conversationId: string }> {
    await this.userConversationRepository.update(
      {
        lastReadMessageId: messageId,
        lastReadMessageAt,
      },
      {
        where: {
          userId,
          conversationId,
        },
      },
    );

    return { messageId, conversationId };
  }

  async findLastReadMessage({
    userId,
    conversationId,
  }): Promise<{ lastReadMessageId: string; lastReadMessageAt: Date }> {
    return await this.userConversationRepository.findOne({
      where: {
        userId,
        conversationId,
      },
      attributes: ['lastReadMessageId', 'lastReadMessageAt'],
    });
  }
}
