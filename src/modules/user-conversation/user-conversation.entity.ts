import { Table, ForeignKey, Column, Model, IsDate, AllowNull, Default, DataType } from 'sequelize-typescript';
import { Conversation } from '../conversations/conversation.entity';
import { User } from '../users/user.entity';

@Table
export class UserConversation extends Model {
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: string;

  @ForeignKey(() => Conversation)
  @Column(DataType.UUID)
  conversationId: string;

  @IsDate
  @AllowNull(false)
  @Default(new Date())
  @Column(DataType.DATE)
  lastReadMessage: Date;
}
