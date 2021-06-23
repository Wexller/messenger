import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  HasOne,
  IsUUID,
  Model,
  PrimaryKey,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { Message } from '../message/message.entity';
import { UserConversation } from '../user-conversations/user-conversation.entity';
import { User } from '../user/user.entity';
import { CONVERSATION_TYPES } from './conversation.constants';

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

  @IsUUID(4)
  @ForeignKey(() => Message)
  @Column(DataType.UUID)
  firstMessageId;

  @IsUUID(4)
  @ForeignKey(() => Message)
  @Column(DataType.UUID)
  lastMessageId;

  @BelongsToMany(() => User, () => UserConversation)
  users: User[];

  @HasOne(() => UserConversation)
  userConversation: UserConversation;

  @HasMany(() => Message, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    hooks: true,
  })
  messages: Message[];
}
