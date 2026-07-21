export interface MessageEnvelope<TPayload> {
  readonly messageId: string;
  readonly messageType: string;
  readonly version: number;
  readonly occurredAt: string;
  readonly correlationId: string;
  readonly causationId?: string;
  readonly payload: TPayload;
}
