import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export default class FriendDeleteDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID(4)
  userId: string;
}
