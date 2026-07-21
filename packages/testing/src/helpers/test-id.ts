import { randomUUID } from 'node:crypto';

export function createTestId(): string {
  return randomUUID();
}
