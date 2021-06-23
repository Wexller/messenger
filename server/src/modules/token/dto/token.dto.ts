import { IToken } from '../interfaces/token.interface';

export class TokenDto implements IToken {
  id: string;
  userId: string;
  refreshToken: string;

  constructor({ id, userId, refreshToken }: IToken) {
    this.id = id;
    this.userId = userId;
    this.refreshToken = refreshToken;
  }
}
