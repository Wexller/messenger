import { IsNotEmpty, IsString } from 'class-validator';

export default class FriendDto {
  @IsNotEmpty()
  @IsString()
  username: string;
}
