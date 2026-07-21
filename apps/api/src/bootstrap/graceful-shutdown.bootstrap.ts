import type { NestFastifyApplication } from '@nestjs/platform-fastify';

export function configureGracefulShutdown(app: NestFastifyApplication): void {
  app.enableShutdownHooks(['SIGTERM', 'SIGINT']);
}
