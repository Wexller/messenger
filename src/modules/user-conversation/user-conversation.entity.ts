import {
  Table,
  ForeignKey,
  Column,
  Model,
  IsDate,
  AllowNull,
  Default,
  DataType,
  IsUUID,
  Sequelize,
} from 'sequelize-typescript';
import { Conversation } from '../conversation/conversation.entity';
import { User } from '../user/user.entity';

@Table
export class UserConversation extends Model {
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: string;

  @ForeignKey(() => Conversation)
  @Column(DataType.UUID)
  conversationId: string;

  @AllowNull(false)
  @Default(Sequelize.literal('uuid_generate_v4()'))
  @IsUUID(4)
  @Column(DataType.UUID)
  lastReadMessageId: Date;
}
