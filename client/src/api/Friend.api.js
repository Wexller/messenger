import { Api } from '@/api/Api';

class FriendApi extends Api {
  static friendPath = '/friend';

  /**
   * @returns {Promise<{data: *, success: boolean}|{success: boolean, message}>}
   */
  async getFriends() {
    return await this.send({
      url: this.buildPath(FriendApi.friendPath),
    });
  }

  /**
   * @param {String} username
   * @returns {Promise<{data: *, success: boolean}|{success: boolean, message}>}
   */
  async addFriend(username) {
    return await this.send({
      method: 'POST',
      url: this.buildPath(FriendApi.friendPath),
      data: {
        username,
      },
    });
  }

  /**
   * @param {String} userId
   * @returns {Promise<{data: *, success: boolean}|{success: boolean, message}>}
   */
  async deleteFriend(userId) {
    return await this.send({
      method: 'DELETE',
      url: this.buildPath(FriendApi.friendPath),
      data: {
        userId,
      },
    });
  }
}

export const friendApi = new FriendApi();
