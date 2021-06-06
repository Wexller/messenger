import { IsNotEmpty, Length } from 'class-validator';
import { UUID_LENGTH } from '../../../constants';

export class ConversationLastMessageUpdateDto {
  @IsNotEmpty()
  @Length(UUID_LENGTH)
  readonly conversationId: string;

  @IsNotEmpty()
  @Length(UUID_LENGTH)
  readonly messageId: string;
}
