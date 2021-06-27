import { Api } from '@/api/Api';

class UserApi extends Api {
  static userPath = 'user';

  async login({ username, password }) {
    return await this.send({
      method: 'POST',
      url: this.buildPath(UserApi.userPath, 'login'),
      data: {
        username,
        password,
      },
    });
  }

  async register({ username, password }) {
    return await this.send({
      method: 'POST',
      url: this.buildPath(UserApi.userPath, 'registration'),
      data: {
        username,
        password,
      },
    });
  }
}

export const userApi = new UserApi();
