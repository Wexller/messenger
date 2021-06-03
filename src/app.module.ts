import { Module } from '@nestjs/common';

import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { AssociationsModule } from './modules/associations/associations.module';
import { MessagesModule } from './modules/messages/messages.module';
import { SharedModule } from './modules/shared/shared.module';
import { EventsGateway } from './app.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    ConversationsModule,
    AssociationsModule,
    MessagesModule,
    AuthModule,
    SharedModule,
  ],
  providers: [EventsGateway],
})
export class AppModule {}
