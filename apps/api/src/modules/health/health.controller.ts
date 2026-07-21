import { Controller, Get } from '@nestjs/common';

interface HealthResponse {
  readonly status: 'ok' | 'ready';
  readonly timestamp: string;
}

@Controller('health')
export class HealthController {
  @Get('live')
  live(): HealthResponse {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  @Get('ready')
  ready(): HealthResponse {
    return { status: 'ready', timestamp: new Date().toISOString() };
  }
}
