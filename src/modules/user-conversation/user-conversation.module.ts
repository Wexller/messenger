import { Module } from '@nestjs/common';
import { userConversationProviders } from './user-conversation.providers';
import { UserConversationService } from './user-conversation.service';

@Module({
  providers: [...userConversationProviders, UserConversationService],
  exports: [UserConversationService],
})
export class UserConversationModule {}
