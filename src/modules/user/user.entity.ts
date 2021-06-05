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
import { Conversation } from '../conversation/conversation.entity';
import { Message } from '../message/message.entity';

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

  @Default('')
  @Column(DataType.STRING)
  name: string;

  @Default('')
  @Column(DataType.STRING)
  bio: string;

  @BelongsToMany(() => Conversation, () => UserConversation)
  conversations: Conversation[];

  @HasMany(() => Message, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    hooks: true,
  })
  messages: Message[];

  @HasMany(() => UserConversation, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    hooks: true,
  })
  userConversations: Message[];
}
