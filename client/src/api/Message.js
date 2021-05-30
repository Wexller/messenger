import Api from '@/api/Api';

export default class Message extends Api {
  static messagePath = 'messages';

  async sendMessage(text, conversation_id) {
    return await this.send({
      method: 'POST',
      url: this.buildPath(Message.messagePath),
      data: {
        text,
        conversation_id,
      },
    });
  }

  async getMessages(conversation_id) {
    return await this.send({
      url: this.buildPath(Message.messagePath, conversation_id),
    });
  }
}
