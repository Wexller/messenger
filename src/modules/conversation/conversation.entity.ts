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
  BelongsToMany,
  IsDate,
  HasMany,
} from 'sequelize-typescript';
import { CONVERSATION_TYPES } from './conversation.constants';
import { Message } from '../message/message.entity';
import { User } from '../user/user.entity';
import { UserConversation } from '../user-conversation/user-conversation.entity';

@Table
export class Conversation extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Default(Sequelize.literal('uuid_generate_v4()'))
  @IsUUID(4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM,
    values: [CONVERSATION_TYPES.GENERAL, CONVERSATION_TYPES.PRIVATE],
  })
  type: string;

  @AllowNull(false)
  @Default('New conversation')
  @Column(DataType.TEXT)
  lastMessageText: string;

  @IsDate
  @AllowNull(false)
  @Default(new Date())
  @Column(DataType.DATE)
  lastMessageAt: Date;

  @BelongsToMany(() => User, () => UserConversation)
  users: User[];

  @HasMany(() => Message)
  messages: Message[];
}
