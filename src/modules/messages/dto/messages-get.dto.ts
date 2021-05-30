import { IsNotEmpty, Length } from 'class-validator';
import { UUID_LENGTH } from '../../../core/constants';

export class MessagesGetDto {
  @IsNotEmpty()
  @Length(UUID_LENGTH)
  readonly conversation_id: string;
}
