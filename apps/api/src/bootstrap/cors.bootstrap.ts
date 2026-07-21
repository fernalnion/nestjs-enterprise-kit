import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import type { Environment } from '../config/environment.schema.js';

export async function configureCors(
  app: NestFastifyApplication,
  env: Environment,
): Promise<void> {
  app.enableCors({
    origin: env.HTTP_CORS_ALLOWED_ORIGINS,
    credentials: env.HTTP_CORS_ALLOW_CREDENTIALS,
  });
}
