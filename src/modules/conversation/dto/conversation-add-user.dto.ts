import { IsNotEmpty, Length } from 'class-validator';
import { UUID_LENGTH } from '../../../constants';

export class ConversationAddUserDto {
  @IsNotEmpty()
  @Length(UUID_LENGTH)
  readonly conversation_id: string;

  @IsNotEmpty()
  readonly username: string;
}
