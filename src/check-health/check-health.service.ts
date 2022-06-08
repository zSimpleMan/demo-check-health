import { HealthCheck, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CheckHealthService {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private configService: ConfigService,
  ) {}

  @HealthCheck()
  async check() {
    return await this.health.check([
      () => this.http.pingCheck('DMP_API_PLATFORM', `${this.configService.get('API_PLATFORM')}/health`),
      () => this.http.pingCheck('test', 'http://localhost:3060'),
    ]);
  }
}
