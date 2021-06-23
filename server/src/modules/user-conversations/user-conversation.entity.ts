import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  IsUUID,
  Model,
  Table,
} from 'sequelize-typescript';

import { UUID_V4_DEFAULT } from '../../constants';
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
  @Default(UUID_V4_DEFAULT)
  @IsUUID(4)
  @Column(DataType.UUID)
  lastReadMessageId: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Conversation)
  conversation: Conversation;
}
