import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConversationModule } from '../conversation/conversation.module';
import { RedisPropagatorModule } from '../shared/redis-propagator/redis-propagator.module';
import { messagesProviders } from './message.providers';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [
    ConversationModule,
    JwtModule.register({
      secret: process.env.JWTKEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
    RedisPropagatorModule,
  ],
  controllers: [MessageController],
  providers: [MessageService, ...messagesProviders],
})
export class MessageModule {}
