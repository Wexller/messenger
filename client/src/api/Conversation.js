import Api from '@/api/Api';

export default class Conversation extends Api {
  static conversationPath = 'conversations';

  /**
   * @param {string} username
   * @returns {Promise<{data: any, success: boolean}|{success: boolean, message}>}
   */
  async startConversation(username) {
    return await this.send({
      method: 'POST',
      url: this.buildPath(Conversation.conversationPath, 'start'),
      data: {
        username,
      },
    });
  }
}
