import { Api } from '@/api/Api';

class FriendApi extends Api {
  static friendPath = '/friend';

  async getFriends() {
    return await this.send({
      url: this.buildPath(FriendApi.friendPath),
    });
  }
}

export const friendApi = new FriendApi();
