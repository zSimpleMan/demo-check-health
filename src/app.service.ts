import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CheckHealthService } from './check-health/check-health.service';
import MailService from './mail/mail.service';

@Injectable()
export class AppService {

  private myMail = 'nhathanluu456@gmail.com'

  constructor(
    private checkHealthService: CheckHealthService,
    private mailService: MailService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  @Cron('*/20 * * * * *')
  async cron () {
    try {
      const value = await this.checkHealthService.check()
      console.log(value)
    } catch (err) {
      console.log(err.response)

      let content = ''
      Object.keys(err.response.error).forEach(key => {
        content += `- ${key}: ${err.response.error[key].message}\n`
      })

      await  this.mailService.sendMail({
        to: this.myMail,
        subject: 'CHECK_HEALTH_DMP_ERROR',
        text: content
      })
    }
  }
}
