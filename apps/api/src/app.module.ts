import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module.js';
import { RequestContextModule } from './platform/request-context/request-context.module.js';

@Module({
  imports: [RequestContextModule, HealthModule],
})
export class AppModule {}
