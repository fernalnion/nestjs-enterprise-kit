import { z } from 'zod';

const durationPattern = /^\d+(ms|s|m|h|d)$/;

const schema = z
  .object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    APP_ENV: z.enum(['development', 'test', 'staging', 'production']).default('development'),
    SERVICE_NAME: z.string().min(1).default('enterprise-kit-api'),
    HTTP_HOST: z.string().min(1).default('0.0.0.0'),
    HTTP_PORT: z.coerce.number().int().min(1).max(65535).default(3000),
    HTTP_BODY_LIMIT: z.coerce.number().int().positive().default(1_048_576),
    HTTP_CORS_ALLOWED_ORIGINS: z
      .string()
      .default('http://localhost:4200')
      .transform((value) => value.split(',').map((item) => item.trim()).filter(Boolean)),
    HTTP_CORS_ALLOW_CREDENTIALS: z
      .enum(['true', 'false'])
      .default('true')
      .transform((value) => value === 'true'),
    DATABASE_URL: z.string().min(1),
    REDIS_URL: z.string().min(1),
    LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
    AUTH_ISSUER: z.string().url(),
    AUTH_AUDIENCE: z.string().min(1),
    AUTH_ACCESS_TOKEN_TTL: z.string().regex(durationPattern).default('10m'),
    AUTH_SESSION_IDLE_TTL: z.string().regex(durationPattern).default('7d'),
    AUTH_SESSION_ABSOLUTE_TTL: z.string().regex(durationPattern).default('30d'),
  })
  .superRefine((value, context) => {
    if (value.HTTP_CORS_ALLOW_CREDENTIALS && value.HTTP_CORS_ALLOWED_ORIGINS.includes('*')) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['HTTP_CORS_ALLOWED_ORIGINS'],
        message: 'Wildcard origin is not allowed when credentials are enabled.',
      });
    }
    if (value.APP_ENV === 'production' && !value.AUTH_ISSUER.startsWith('https://')) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['AUTH_ISSUER'],
        message: 'Production issuer must use HTTPS.',
      });
    }
  });

export type Environment = z.infer<typeof schema>;

export function loadEnvironment(source: NodeJS.ProcessEnv): Environment {
  const result = schema.safeParse(source);
  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `- ${issue.path.join('.') || 'environment'}: ${issue.message}`)
      .join('\n');
    throw new Error(`Configuration validation failed:\n${details}`);
  }
  return Object.freeze(result.data);
}
