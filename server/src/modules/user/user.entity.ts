import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  Default,
  HasMany,
  HasOne,
  IsUUID,
  Model,
  PrimaryKey,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { Conversation } from '../conversation/conversation.entity';
import { Friend } from '../friend/friend.entity';
import { Message } from '../message/message.entity';
import { Token } from '../token/token.entity';
import { UserConversation } from '../user-conversations/user-conversation.entity';

@Table
export class User extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Default(Sequelize.literal('uuid_generate_v4()'))
  @IsUUID(4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  username: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password: string;

  @Default('')
  @Column(DataType.STRING)
  name: string;

  @BelongsToMany(() => Conversation, () => UserConversation)
  conversations: Conversation[];

  @HasOne(() => UserConversation)
  userConversation: UserConversation;

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
  userConversations: UserConversation[];

  @HasMany(() => Friend, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    hooks: true,
  })
  friends: Friend[];

  @HasOne(() => Token, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    hooks: true,
  })
  token: Token;
}
