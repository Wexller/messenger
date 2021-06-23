import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { User } from '../user/user.entity';

@Table
export class Friend extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Default(Sequelize.literal('uuid_generate_v4()'))
  @IsUUID(4)
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  friendId: string;

  @BelongsTo(() => User, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    hooks: true,
  })
  user: User;
}
