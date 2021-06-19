import { IUser } from '../../user/interfaces/user.interface';

export interface IConversation {
  id: string;
  name: string;
  lastReadMessageId: string;
  firstMessageId: string | null;
  lastMessageId: string | null;
  users: [IUser];
}
