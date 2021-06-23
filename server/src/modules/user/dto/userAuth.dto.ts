import { IsString, IsNotEmpty } from 'class-validator';

export class UserAuthDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  constructor(payload) {
    if (payload) {
      const { username, password } = payload;
      this.username = username;
      this.password = password;
    }
  }
}
