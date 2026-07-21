export class SecretValue {
  private constructor(private readonly value: string) {}

  static from(value: string): SecretValue {
    if (value.length === 0) throw new Error('Secret value cannot be empty.');
    return new SecretValue(value);
  }

  reveal(): string {
    return this.value;
  }

  toString(): string {
    return '[REDACTED]';
  }

  toJSON(): string {
    return '[REDACTED]';
  }
}
