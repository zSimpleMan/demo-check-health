import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
// import { CheckHealthService } from './check-health/check-health.service';

@Injectable()
export class AppService {

  constructor(
    // private checkHealthService: CheckHealthService
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  // @Cron(CronExpression.EVERY_10_SECONDS)
  // cron () {
  //   const value = this.checkHealthService.check()
  //   console.log(value)
  // }
}
