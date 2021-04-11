import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ConversationsService } from '../../modules/conversations/conversations.service';

@Injectable()
export class DoesUserHasAccessToConversationGuard implements CanActivate {
  constructor(
    private readonly conversationsService: ConversationsService,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

    if (!jwtFromRequest) {
      throw new UnauthorizedException(
        'You are not authorized to perform the operation',
      );
    }

    const user = this.jwtService.verify(jwtFromRequest, {
      secret: process.env.JWTKEY,
    });

    if (!user) {
      throw new UnauthorizedException(
        'You are not authorized to perform the operation',
      );
    }

    const conversationExist = await this.conversationsService.findOneWithUser(
      user.id,
      request.body.conversation_id,
    );

    if (!conversationExist) {
      throw new ForbiddenException(
        `You don't have access to this conversation`,
      );
    }
    return true;
  }
}
