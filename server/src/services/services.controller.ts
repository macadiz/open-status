import { Body, Controller, Get, Post } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServiceAPIBodyDTO } from './dto/services-api-body';

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
      body.uptimeThreshold,
      body.url,
      body.method,
      body.queryParams,
      body.headers,
      body.body,
    );
  }
}
