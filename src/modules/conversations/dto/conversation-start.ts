import { IsNotEmpty, Length } from 'class-validator';
import { UUID_LENGTH } from '../../../core/constants';

export class ConversationStartDto {
  @IsNotEmpty()
  @Length(UUID_LENGTH)
  readonly conversation_id: string;

  @IsNotEmpty()
  readonly username: string;
}
