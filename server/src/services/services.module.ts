import { Module } from '@nestjs/common';
import { InfraModule } from 'src/infra/infra.module';
import { ServicesService } from './services.service';
import { ServicesRepository } from './services.repository';
import { ServicesMonitorService } from './services.schedule';
import { ServicesController } from './services.controller';

@Module({
  imports: [InfraModule],
  controllers: [ServicesController],
  providers: [ServicesMonitorService, ServicesService, ServicesRepository],
})
export class ServicesModule {}
