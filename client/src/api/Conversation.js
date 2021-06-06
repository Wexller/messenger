import Api from '@/api/Api';

export default class Conversation extends Api {
  static conversationPath = 'conversations';

  /**
   * @param {String} username
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

  /**
   * @param {String} conversationId
   * @param {String} messageId
   * @returns {Promise<{data: any, success: boolean}|{success: boolean, message}>}
   */
  async updateLastReadMessage(conversationId, messageId) {
    return await this.send({
      method: 'POST',
      url: this.buildPath(Conversation.conversationPath, 'update_last_message_id'),
      data: {
        conversationId,
        messageId,
      },
    });
  }
}
