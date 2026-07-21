import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WorkerModule } from '../worker.module.js';

export async function bootstrapWorker(): Promise<void> {
  const app = await NestFactory.createApplicationContext(WorkerModule, {
    bufferLogs: true,
  });
  app.enableShutdownHooks(['SIGTERM', 'SIGINT']);
  Logger.log('Worker application context started', 'Bootstrap');
}
