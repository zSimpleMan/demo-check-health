import { HealthCheck, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CheckHealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  @HealthCheck()
  async check() {
    const dt = await this.health.check([
      () => this.http.pingCheck('dmp', 'http://localhost:3000'),
    ]);
    console.log(dt)
  }
}
