import { IsNotEmpty, MinLength } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  readonly login: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
