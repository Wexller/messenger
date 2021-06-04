import { IsNotEmpty, Length } from 'class-validator';
import { UUID_LENGTH } from '../../../core/constants';

export class MessageDto {
  @IsNotEmpty()
  readonly text: string;

  @IsNotEmpty()
  @Length(UUID_LENGTH)
  readonly conversation_id: string;
}
