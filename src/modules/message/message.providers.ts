import { MESSAGE_REPOSITORY } from './message.constants';
import { Message } from './message.entity';

export const messagesProviders = [
  {
    provide: MESSAGE_REPOSITORY,
    useValue: Message,
  },
];
