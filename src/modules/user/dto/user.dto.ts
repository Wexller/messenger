import { IsNotEmpty, MinLength } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  @MinLength(2)
  readonly password: string;
}
