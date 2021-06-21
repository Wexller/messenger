import UserAuthDto from './dto/userAuth.dto';
import { COOKIE_MAX_AGE, REFRESH_TOKEN } from './user.constants';
import userService from './user.service';
import { Request, Response, NextFunction } from 'express';

class UserController {
  async registration(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const userAuthDto = new UserAuthDto(req.body);
      const userData = await userService.registration(userAuthDto);

      res.cookie(REFRESH_TOKEN, userData.refreshToken, { maxAge: COOKIE_MAX_AGE, httpOnly: true });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const userAuthDto = new UserAuthDto(req.body);
      const userData = await userService.login(userAuthDto);

      res.cookie(REFRESH_TOKEN, userData.refreshToken, { maxAge: COOKIE_MAX_AGE, httpOnly: true });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const refreshToken = req.cookies[REFRESH_TOKEN];
      const token = await userService.logout(refreshToken);
      res.clearCookie(REFRESH_TOKEN);
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const refreshToken = req.cookies[REFRESH_TOKEN];
      const userData = await userService.refreshToken(refreshToken);
      res.cookie(REFRESH_TOKEN, userData.refreshToken, { maxAge: COOKIE_MAX_AGE, httpOnly: true });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
