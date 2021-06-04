import { IsNotEmpty, IsEnum } from 'class-validator';
import { CONVERSATION_TYPES } from '../../../core/constants';

export class ConversationDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEnum(CONVERSATION_TYPES, {
    message: `Conversation type must be only: ${CONVERSATION_TYPES.PRIVATE} or ${CONVERSATION_TYPES.GENERAL}`,
  })
  readonly type: string;
}
