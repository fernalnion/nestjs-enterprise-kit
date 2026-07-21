import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import type { Environment } from '../config/environment.schema.js';

export function configureOpenApi(app: NestFastifyApplication, env: Environment): void {
  if (env.APP_ENV === 'production') return;

  const config = new DocumentBuilder()
    .setTitle('NestJS Enterprise Kit API')
    .setDescription('Enterprise modular-monolith starter API')
    .setVersion('0.1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}
