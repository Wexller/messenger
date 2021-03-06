import { Sequelize } from 'sequelize-typescript';
import { UserConversation } from '../../modules/user-conversation/user-conversation.entity';
import { Conversation } from '../../modules/conversation/conversation.entity';
import { Message } from '../../modules/message/message.entity';
import { User } from '../../modules/user/user.entity';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from './database.constants';
import { databaseConfig } from './database.config';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([User, Conversation, UserConversation, Message]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
