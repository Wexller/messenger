import { IsDate, IsNotEmpty, IsNumber, Length } from 'class-validator';
import { UUID_LENGTH } from '../../../constants';

export class MessagesReadUnreadGetDto {
  @IsNotEmpty()
  @Length(UUID_LENGTH)
  readonly conversationId: string;

  @IsNotEmpty()
  @IsDate()
  readonly lastReadMessageAt: Date;

  @IsNumber()
  readonly readMessagesLimit: number;

  @IsNumber()
  readonly unreadMessagesLimit: number;
}
