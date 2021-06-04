import { Module } from '@nestjs/common';

import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConversationModule } from './modules/conversation/conversation.module';
import { MessageModule } from './modules/message/message.module';
import { SharedModule } from './modules/shared/shared.module';
import { EventsGateway } from './app.gateway';
import { UserConversationModule } from './modules/user-conversation/user-conversation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    AuthModule,
    ConversationModule,
    MessageModule,
    AuthModule,
    SharedModule,
    UserConversationModule,
  ],
  providers: [EventsGateway],
})
export class AppModule {}
