import { IsNotEmpty, Length } from 'class-validator';
import { UUID_LENGTH } from '../../../constants';

export class ConversationStartDto {
  @IsNotEmpty()
  @Length(UUID_LENGTH)
  readonly conversationId: string;

  @IsNotEmpty()
  readonly username: string;
}
