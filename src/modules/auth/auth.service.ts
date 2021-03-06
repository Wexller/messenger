import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(username: string, pass: string) {
    // find if user exist with this username
    const user = await this.userService.findOneByUsername(username);
    if (!user) {
      return null;
    }

    // find if user password match
    const match = await AuthService.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user['dataValues'];
    return result;
  }

  public async login(user) {
    const token = await this.generateToken(user);
    return { user, token };
  }

  public async create(user) {
    // hash the password
    const pass = await AuthService.hashPassword(user.password);

    // create the user
    const newUser = await this.userService.create({ ...user, password: pass });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = newUser['dataValues'];

    // generate token
    const token = await this.generateToken(result);

    // return the user and the token
    return { user: result, token };
  }

  private async generateToken(user) {
    return await this.jwtService.signAsync(user);
  }

  async verifyJwt(jwtToken: string): Promise<any> {
    return await this.jwtService.verify(jwtToken, { secret: process.env.JWTKEY });
  }

  private static async hashPassword(password) {
    return await bcrypt.hash(password, +process.env.SALT_ROUNDS);
  }

  private static async comparePassword(enteredPassword, dbPassword) {
    return await bcrypt.compare(enteredPassword, dbPassword);
  }
}
