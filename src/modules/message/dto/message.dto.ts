import { IsNotEmpty, Length } from 'class-validator';
import { UUID_LENGTH } from '../../../constants';

export class MessageDto {
  @IsNotEmpty()
  readonly text: string;

  @IsNotEmpty()
  @Length(UUID_LENGTH)
  readonly conversationId: string;
}
