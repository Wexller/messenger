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
    if (!metatype || !ValidateInputPipe.toValidate(metatype)) {
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

  // eslint-disable-next-line @typescript-eslint/ban-types
  private static toValidate(metatype: Function): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
