import { IsNotEmpty, Length } from 'class-validator';
import { UUID_LENGTH } from '../../../core/constants';

export class UserConversationDto {
  @IsNotEmpty()
  @Length(UUID_LENGTH)
  readonly userId: string;

  @IsNotEmpty()
  readonly conversationId: string;
}
