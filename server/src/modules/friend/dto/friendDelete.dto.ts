import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FriendDeleteDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID(4)
  userId: string;
}
