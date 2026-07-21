import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from '../app.module.js';
import { loadEnvironment } from '../config/environment.schema.js';
import { configureCors } from './cors.bootstrap.js';
import { configureGracefulShutdown } from './graceful-shutdown.bootstrap.js';
import { configureOpenApi } from './openapi.bootstrap.js';

export async function bootstrapApi(): Promise<void> {
  const env = loadEnvironment(process.env);
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      bodyLimit: env.HTTP_BODY_LIMIT,
      trustProxy: true,
      logger: false,
    }),
    { bufferLogs: true },
  );

  app.setGlobalPrefix('api/v1', { exclude: ['health/live', 'health/ready'] });
  await configureCors(app, env);
  configureOpenApi(app, env);
  configureGracefulShutdown(app);

  await app.listen({ host: env.HTTP_HOST, port: env.HTTP_PORT });
  Logger.log(`API listening on ${env.HTTP_HOST}:${env.HTTP_PORT}`, 'Bootstrap');
}
