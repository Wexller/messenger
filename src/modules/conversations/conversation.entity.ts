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
import { CONVERSATION_TYPES } from '../../core/constants';
import { Message } from '../messages/message.entity';
import { User } from '../users/user.entity';
import { UserConversations } from '../associations/user-conversations.entity';

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
  last_message_text: string;

  @IsDate
  @AllowNull(false)
  @Default(new Date())
  @Column(DataType.DATE)
  last_message_at: Date;

  @BelongsToMany(() => User, () => UserConversations)
  users: User[];

  @HasMany(() => Message)
  messages: Message[];
}
