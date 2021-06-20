import { hash, compare } from 'bcrypt';
import tokenService from '../token/token.service';
import ApiException from '../../core/exceptions/api.exception';
import UserAuthDto from './dto/userAuthDto';
import UserDataDto from './dto/userData.dto';
import IAuthUser from './interfaces/authUser.interface';
import { INCORRECT_USER_DATA, SALT_ROUNDS } from './user.constants';
import User from './user.entity';

class UserService {
  async registration({ username, password }: UserAuthDto): Promise<IAuthUser> {
    const candidate = await User.findOne({ where: { username } });

    if (candidate) {
      throw ApiException.BadRequest(`User, with username ${username}, has already exists`);
    }

    const hashedPassword = await hash(password, SALT_ROUNDS);
    const user = await User.create({ username, password: hashedPassword });
    const userDto = new UserDataDto(user);
    const tokens = tokenService.generateTokens(userDto);
    await tokenService.saveToken(user, tokens.refreshToken);

    return { ...tokens, ...userDto };
  }

  async login({ username, password }: UserAuthDto): Promise<IAuthUser> {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw ApiException.BadRequest(INCORRECT_USER_DATA);
    }

    const isPassEquals = await compare(password, user.password);

    if (!isPassEquals) {
      throw ApiException.BadRequest(INCORRECT_USER_DATA);
    }

    const userDto = new UserDataDto(user);
    const tokens = tokenService.generateTokens(userDto);
    await tokenService.saveToken(user, tokens.refreshToken);

    return { ...tokens, ...userDto };
  }

  async logout(refreshToken: string): Promise<boolean> {
    return await tokenService.removeToken(refreshToken);
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw ApiException.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenData = await tokenService.findToken(refreshToken);

    if (!userData || !tokenData) {
      throw ApiException.UnauthorizedError();
    }

    // TODO: Use relationship Token => User
    const user = await User.findByPk(tokenData.userId);
    const userDto = new UserDataDto(user);
    const tokens = tokenService.generateTokens(userDto);

    await tokenService.saveToken(user, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}

export default new UserService();
