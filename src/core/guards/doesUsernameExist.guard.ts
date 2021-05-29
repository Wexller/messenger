import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../../modules/users/users.service';

@Injectable()
export class DoesUsernameExist implements CanActivate {
  constructor(private readonly userService: UsersService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(payload: any) {
    const {
      body: { username },
    } = payload;

    const user = await this.userService.findOneByUsername(username);

    if (!user) {
      throw new ForbiddenException(`Username ${username} wasn't found`);
    }

    payload.requestedUser = {
      id: user.id,
      username: user.username,
      record: user,
    };

    return true;
  }
}
