import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from '../../modules/user/user.service';

@Injectable()
export class DoesUserExist implements CanActivate {
  constructor(private readonly userService: UserService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest({ body: { username } }) {
    const userExist = await this.userService.findOneByUsername(username);
    if (userExist) {
      throw new ForbiddenException('This login already exist');
    }
    return true;
  }
}
