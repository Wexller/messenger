import { IsString } from 'class-validator';
import { IUser } from '../interfaces/user.interface';

export class UserDataDto {
  @IsString()
  id: string;

  @IsString()
  username: string;

  constructor({ id, username }: IUser) {
    this.id = id;
    this.username = username;
  }
}
