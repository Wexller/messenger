import { IsNotEmpty, IsAlphanumeric } from 'class-validator';

export class FriendDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  username: string;
}
