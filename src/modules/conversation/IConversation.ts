export interface IConversation {
  id: string;
  name: string;
  lastReadMessageId: string;
  firstMessageId: string | null;
  lastMessageId: string | null;
  users: [
    {
      id: string;
      name: string;
      username: string;
    },
  ];
}
