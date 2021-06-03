export class RedisSocketConversationEventEmitDto {
  public readonly conversationId: string;
  public readonly event: string;
  public readonly data: unknown;
}
