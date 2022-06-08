import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
// import { HealthController } from './check-health.controller';
import { CheckHealthService } from './check-health.service';

@Module({
  imports: [TerminusModule, HttpModule, ConfigModule],
  controllers: [],
  providers: [CheckHealthService],
  exports: [CheckHealthService]
})
export class CheckHealthModule {}
