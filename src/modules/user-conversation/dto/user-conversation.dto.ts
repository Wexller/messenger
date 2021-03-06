import { IsNotEmpty, Length } from 'class-validator';
import { UUID_LENGTH } from '../../../constants';

export class UserConversationDto {
  @IsNotEmpty()
  @Length(UUID_LENGTH)
  readonly userId: string;

  @IsNotEmpty()
  @Length(UUID_LENGTH)
  readonly messageId: string;

  @IsNotEmpty()
  readonly lastReadMessageAt: Date;

  @IsNotEmpty()
  readonly conversationId: string;
}
