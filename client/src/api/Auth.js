import Api from '@/api/Api';

export default class Auth extends Api {
  static authPath = '/auth';

  async signIn({ username, password }) {
    return await this.send({
      method: 'POST',
      url: this.buildPath(Auth.authPath, 'login'),
      data: {
        username,
        password,
      },
    });
  }

  async signUp({ username, password }) {
    return await this.send({
      method: 'POST',
      url: this.buildPath(Auth.authPath, 'signup'),
      data: {
        username,
        password,
      },
    });
  }
}
