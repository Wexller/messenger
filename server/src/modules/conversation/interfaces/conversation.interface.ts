import { IUser } from '../../user/interfaces/user.interface';

export interface IConversation {
  id: string;
  name: string;
  type: string;
  lastReadMessageId: string;
  firstMessageId: string | null;
  lastMessageId: string | null;
  users: IUser[];
}
