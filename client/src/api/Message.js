import Api from '@/api/Api';

export default class Message extends Api {
  static messagePath = 'messages';

  async sendMessage(text, conversationId) {
    return await this.send({
      method: 'POST',
      url: this.buildPath(Message.messagePath),
      data: {
        text,
        conversationId,
      },
    });
  }

  async getMessages(conversationId) {
    return await this.send({
      url: this.buildPath(Message.messagePath, conversationId),
    });
  }
}
