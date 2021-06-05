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
import { Conversation } from '../conversation/conversation.entity';
import { User } from '../user/user.entity';

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
  userId: string;

  @AllowNull(false)
  @IsUUID(4)
  @ForeignKey(() => Conversation)
  @Column(DataType.UUID)
  conversationId: string;

  @BelongsTo(() => User, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    hooks: true,
  })
  user: User;

  @BelongsTo(() => Conversation, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    hooks: true,
  })
  conversation: Conversation;
}
