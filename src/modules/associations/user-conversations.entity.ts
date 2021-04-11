import { Table, ForeignKey, Column, Model } from 'sequelize-typescript';
import { Conversation } from '../conversations/conversation.entity';
import { User } from '../users/user.entity';

@Table
export class UserConversations extends Model {
  @ForeignKey(() => User)
  @Column
  userId: string;

  @ForeignKey(() => Conversation)
  @Column
  conversationId: string;
}
