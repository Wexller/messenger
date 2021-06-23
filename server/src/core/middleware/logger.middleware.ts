import { Request, Response, NextFunction } from 'express';

export const loggerMiddleware = (request: Request, response: Response, next: NextFunction): void => {
  console.log('\x1b[32m' + `[${request.method}] - ${request.path}` + '\x1b[0m');
  next();
};
