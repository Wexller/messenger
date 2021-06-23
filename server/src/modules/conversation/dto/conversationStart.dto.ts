import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ConversationStartDto {
  @IsUUID(4)
  @IsNotEmpty()
  @IsString()
  friendId: string;
}
