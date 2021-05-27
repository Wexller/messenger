import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConversationsService } from '../../modules/conversations/conversations.service';

@Injectable()
export class DoesUserHasAccessToConversation implements CanActivate {
  constructor(private readonly conversationsService: ConversationsService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const conversationId = request.body.conversation_id ?? request.params.uuid;

    if (!conversationId || conversationId.length !== 36) {
      throw new BadRequestException(
        `Conversation ID wasn't passed or incorrect format`,
      );
    }

    const conversationWithUser = await this.conversationsService.findOneWithUser(
      request.user.id,
      conversationId,
    );

    if (!conversationWithUser) {
      throw new ForbiddenException(
        `You don't have access to this conversation`,
      );
    }

    return true;
  }
}
