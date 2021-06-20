import { NextFunction, Request, Response } from 'express';
import tokenService from '../../modules/token/token.service';
import ApiException from '../exceptions/api.exception';

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiException.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiException.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiException.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiException.UnauthorizedError());
  }
}
