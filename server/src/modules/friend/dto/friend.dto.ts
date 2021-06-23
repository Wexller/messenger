import { IsNotEmpty, IsString } from 'class-validator';

export class FriendDto {
  @IsNotEmpty()
  @IsString()
  username: string;
}
