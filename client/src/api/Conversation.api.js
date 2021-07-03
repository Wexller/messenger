import { Api } from '@/api/Api';

class ConversationApi extends Api {
  static conversationPath = 'conversation';

  /**
   * @returns {Promise<{data: any, success: boolean}|{success: boolean, message}>}
   */
  async getList() {
    return await this.send({
      method: 'GET',
      url: this.buildPath(ConversationApi.conversationPath),
    });
  }

  /**
   * @returns {Promise<{data: any, success: boolean}|{success: boolean, message}>}
   */
  async getInfo(conversationId) {
    return await this.send({
      method: 'GET',
      url: this.buildPath(ConversationApi.conversationPath, conversationId),
    });
  }

  /**
   * @param {String} friendId
   * @returns {Promise<{data: any, success: boolean}|{success: boolean, message}>}
   */
  async startConversation(friendId) {
    return await this.send({
      method: 'POST',
      url: this.buildPath(ConversationApi.conversationPath, 'start'),
      data: {
        friendId,
      },
    });
  }

  /**
   * @param {String} conversationId
   * @param {String} messageId
   * @returns {Promise<{data: any, success: boolean}|{success: boolean, message}>}
   */
  async updateLastReadMessage(conversationId, messageId) {
    return await this.send({
      method: 'POST',
      url: this.buildPath(ConversationApi.conversationPath, 'update_last_message_id'),
      data: {
        conversationId,
        messageId,
      },
    });
  }
}

export const conversationApi = new ConversationApi();
