import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { UserDataDto } from '../user/dto/userData.dto';
import { User } from '../user/user.entity';
import { TokenDto } from './dto/token.dto';
import { ITokens } from './interfaces/generatedTokens.interface';
import { Token } from './token.entity';

class TokenService {
  generateTokens(payload: UserDataDto): ITokens {
    const plainPayload = JSON.parse(JSON.stringify(payload));

    const accessToken = sign(plainPayload, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRE });
    const refreshToken = sign(plainPayload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRE,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token: string): string | JwtPayload | null {
    try {
      return verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token): string | JwtPayload | null {
    try {
      return verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (e) {
      return null;
    }
  }

  async saveToken(user: User, refreshToken: string): Promise<Token> {
    const userId = user.id;
    const tokenData = await Token.findOne({
      where: {
        userId,
      },
    });

    if (tokenData) {
      return await tokenData.update({ refreshToken });
    }

    const createdToken = await Token.create({ userId, refreshToken });
    await createdToken.$set('user', user);

    return createdToken;
  }

  async removeToken(refreshToken: string): Promise<boolean> {
    const deletedRows = await Token.destroy({ where: { refreshToken } });
    return deletedRows > 0;
  }

  async findToken(refreshToken: string): Promise<TokenDto> {
    const token = await Token.findOne({ where: { refreshToken } });
    return new TokenDto(token);
  }
}

export const tokenService = new TokenService();
