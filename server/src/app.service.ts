import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class AppService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  getHello(): string {
    return 'Hello World!';
  }
}
