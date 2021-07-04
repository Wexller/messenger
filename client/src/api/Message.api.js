import { Api } from '@/api/Api';

class MessageApi extends Api {
  static messagePath = 'message';

  async sendMessage(text, conversationId) {
    return await this.send({
      method: 'POST',
      url: this.buildPath(MessageApi.messagePath),
      data: {
        text,
        conversationId,
      },
    });
  }

  async getMessages(conversationId) {
    return await this.send({
      url: this.buildPath(MessageApi.messagePath, conversationId),
    });
  }

  /**
   * Fetch old messages in conversation
   * @param {String} conversationId
   * @param {String} messageId
   * @returns {Promise<*>}
   */
  async getOldMessages(conversationId, messageId) {
    return await this.send({
      url: this.buildPath(MessageApi.messagePath, conversationId, 'get_old'),
      params: {
        messageId,
      },
    });
  }

  /**
   * Fetch new messages in conversation
   * @param {String} conversationId
   * @param {String} messageId
   * @returns {Promise<*>}
   */
  async getNewMessages(conversationId, messageId) {
    return await this.send({
      url: this.buildPath(MessageApi.messagePath, conversationId, 'get_new'),
      params: {
        messageId,
      },
    });
  }
}

export const messageApi = new MessageApi();
