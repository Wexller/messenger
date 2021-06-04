import {
  Table,
  Column,
  Default,
  AllowNull,
  PrimaryKey,
  IsUUID,
  Unique,
  Model,
  DataType,
  Sequelize,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { UserConversation } from '../user-conversation/user-conversation.entity';
import { Conversation } from '../conversations/conversation.entity';
import { Message } from '../messages/message.entity';

@Table
export class User extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Default(Sequelize.literal('uuid_generate_v4()'))
  @IsUUID(4)
  @Column(DataType.UUID)
  id: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  username: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password: string;

  @BelongsToMany(() => Conversation, () => UserConversation)
  users: Conversation[];

  @HasMany(() => Message)
  messages: Message[];

  @HasMany(() => UserConversation)
  userConversations: Message[];
}
