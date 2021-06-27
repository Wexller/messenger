import { Api } from '@/api/Api';

class MessageApi extends Api {
  static messagePath = 'messages';

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
      url: this.buildPath(MessageApi.messagePath, conversationId, 'load_old_messages'),
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
      url: this.buildPath(MessageApi.messagePath, conversationId, 'load_new_messages'),
      params: {
        messageId,
      },
    });
  }
}

export const messageApi = new MessageApi();
