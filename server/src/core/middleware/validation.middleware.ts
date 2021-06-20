import ApiException from '../../core/exceptions/api.exception';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { RequestHandler, Request, Response, NextFunction } from 'express';

export default function validationMiddleware<T>(type: any): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const errors = await validate(plainToClass(type, req.body));

    if (errors.length > 0) {
      const errorArr = [];

      for (const error of errors) {
        errorArr.push(...Object.values(error.constraints));
      }

      next(ApiException.BadRequest(errorArr.join(', '), errorArr));
    } else {
      next();
    }
  };
}
