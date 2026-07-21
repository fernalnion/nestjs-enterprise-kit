export interface ExecutionContext {
  readonly requestId?: string;
  readonly traceId?: string;
  readonly correlationId: string;
  readonly causationId?: string;
  readonly userId?: string;
  readonly sessionId?: string;
}
