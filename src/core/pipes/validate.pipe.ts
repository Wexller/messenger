import {
  Injectable,
  ArgumentMetadata,
  UnprocessableEntityException,
  PipeTransform,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidateInputPipe implements PipeTransform {
  public async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new UnprocessableEntityException(
        ValidateInputPipe.handleError(errors),
      );
    }

    return value;
  }

  private static handleError(errors) {
    return errors.map((e) => e.constraints);
  }
}
