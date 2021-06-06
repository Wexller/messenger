export interface IConversation {
  id: string;
  name: string;
  lastReadMessageId: string;
  users: [
    {
      id: string;
      name: string;
      username: string;
    },
  ];
}
