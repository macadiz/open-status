import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServiceAPIBodyDTO } from './dto/services-api-body';
import { SummaryQueryDTO } from './dto/summary-query';

@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Get('/')
  async getAllServices() {
    return this.servicesService.getAllAPIServices();
  }

  @Post('/api')
  async addNewApi(@Body() body: ServiceAPIBodyDTO) {
    return this.servicesService.addAPIService(
      body.alias,
      body.checkInterval,
      body.warningThreshold,
      body.dangerThreshold,
      body.url,
      body.method,
      body.queryParams,
      body.headers,
      body.body,
      body.bodyType,
      body.expectedResponse,
      body.responseType,
    );
  }

  @Get('/summary')
  async getServicesSummary(@Query() summaryQuery: SummaryQueryDTO) {
    return this.servicesService.getServicesSummary(
      summaryQuery.startDate,
      summaryQuery.endDate,
    );
  }
}
