import type { MessageEnvelope } from '../common/message-envelope.js';

export type IntegrationEvent<TPayload> = MessageEnvelope<TPayload>;
