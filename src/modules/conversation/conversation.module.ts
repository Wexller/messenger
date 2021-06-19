import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MessageModule } from '../message/message.module';
import { UserConversationModule } from '../user-conversation/user-conversation.module';
import { UserModule } from '../user/user.module';
import { conversationsProviders } from './conversation.providers';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWTKEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
    UserConversationModule,
    forwardRef(() => MessageModule),
  ],
  controllers: [ConversationController],
  providers: [ConversationService, ...conversationsProviders],
  exports: [ConversationService],
})
export class ConversationModule {}
