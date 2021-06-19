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
import User from '../user/user.entity';

@Table
export default class Token extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Default(Sequelize.literal('uuid_generate_v4()'))
  @IsUUID(4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @IsUUID(4)
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  token: string;

  @BelongsTo(() => User)
  user: User;
}
