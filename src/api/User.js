import Api from '@/api/Api';

export default class User extends Api {
  static userPath = 'users';

  async getUsers() {
    return await this.send({
      url: this.buildPath(User.userPath),
    });
  }
}
