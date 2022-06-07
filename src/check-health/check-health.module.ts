import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
// import { HealthController } from './check-health.controller';
import { CheckHealthController } from './check-health.service';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [],
  providers: [CheckHealthController],
  // exports: [CheckHealthService]
})
export class CheckHealthModule {}
