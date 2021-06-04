import { Module } from '@nestjs/common';

import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { MessagesModule } from './modules/messages/messages.module';
import { SharedModule } from './modules/shared/shared.module';
import { EventsGateway } from './app.gateway';
import { UserConversationModule } from './modules/user-conversation/user-conversation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    ConversationsModule,
    MessagesModule,
    AuthModule,
    SharedModule,
    UserConversationModule,
  ],
  providers: [EventsGateway],
})
export class AppModule {}
