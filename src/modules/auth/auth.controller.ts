import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DoesUserExist } from '../../core/guards/doesUserExist.guard';
import { AuthService } from './auth.service';
import { UserDto } from '../user/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(DoesUserExist)
  @Post('signup')
  async signUp(@Body() user: UserDto) {
    return await this.authService.create(user);
  }
}
