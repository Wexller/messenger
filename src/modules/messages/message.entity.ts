import {
  Table,
  Column,
  Default,
  AllowNull,
  PrimaryKey,
  IsUUID,
  Model,
  DataType,
  Sequelize,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Conversation } from '../conversations/conversation.entity';
import { User } from '../users/user.entity';

@Table
export class Message extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Default(Sequelize.literal('uuid_generate_v4()'))
  @IsUUID(4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  text: string;

  @AllowNull(false)
  @IsUUID(4)
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  user_id: string;

  @AllowNull(false)
  @IsUUID(4)
  @ForeignKey(() => Conversation)
  @Column(DataType.UUID)
  conversation_id: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Conversation)
  conversation: Conversation;
}
