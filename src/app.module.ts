import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CheckHealthModule } from './check-health/check-health.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    CheckHealthModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
