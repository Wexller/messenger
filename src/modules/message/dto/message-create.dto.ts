import { IsNotEmpty, Length } from 'class-validator';
import { UUID_LENGTH } from '../../../core/constants';
import { MessageDto } from './message.dto';

export class MessageCreateDto extends MessageDto {
  @IsNotEmpty()
  @Length(UUID_LENGTH)
  readonly user_id: string;
}
