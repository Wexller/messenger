import { ApiException } from '../exceptions/api.exception';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

// noinspection JSUnusedLocalSymbols
export const errorMiddleware = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction,
): Response => {
  console.log(err);

  if (err instanceof ApiException) {
    return res.status(err.status).json({ message: err.message, errors: err.errors });
  }

  return res.status(500).json({ message: 'Server error' });
};
