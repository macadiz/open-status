import { Injectable } from '@nestjs/common';
import { ServicesRepository } from './services.repository';
import { Method } from 'axios';
import { ServiceConfig, ServicesMonitorService } from './services.schedule';

@Injectable()
export class ServicesService {
  constructor(
    private servicesScheduleService: ServicesMonitorService,
    private servicesRepository: ServicesRepository,
  ) {}

  async addAPIService(
    alias: string,
    checkInterval: number,
    uptimeThreshold: number,
    url: string,
    method: Method,
    queryParams?: Record<string, string>,
    headers?: Record<string, string>,
    body?: string,
  ) {
    const service = await this.servicesRepository.addAPIService(
      alias,
      checkInterval,
      uptimeThreshold,
      url,
      method,
      queryParams,
      headers,
      body,
    );

    this.servicesScheduleService.addService({
      ...service,
      checkInterval,
      uptimeThreshold,
      url,
      method,
      queryParams,
      headers,
      body,
    });
  }

  public async addServiceLog(
    serviceId: string,
    isAvailable: boolean,
    message?: string,
  ) {
    await this.servicesRepository.addServiceLog(
      serviceId,
      isAvailable,
      message,
    );
  }

  async getAllAPIServices(): Promise<ServiceConfig[]> {
    const allApiServices = await this.servicesRepository.getAllApiServices();

    const mappedApiServices = allApiServices.map((service) => {
      const serviceConfig = service.serviceConfig!;
      const apiConfig = serviceConfig.apiConfig!;

      const [headers, params] = (apiConfig?.params ?? []).reduce(
        (acc, curr) => {
          switch (curr.type) {
            case 'Header':
              acc[0][curr.key] = curr.value;
              break;
            case 'Query':
              acc[1][curr.key] = curr.value;
              break;
          }
          return acc;
        },
        [{}, {}] as [Record<string, string>, Record<string, string>],
      );

      return {
        alias: service.alias,
        id: service.id,
        url: apiConfig.url,
        uptimeThreshold: serviceConfig.uptimeThreshold,
        checkInterval: serviceConfig.checkInterval,
        method: apiConfig.method as Method,
        body: apiConfig.body,
        headers,
        params,
        expectedResponse: apiConfig.expectedResponse,
        responseType: apiConfig.responseType,
      };
    });

    return mappedApiServices;
  }

  async getAllServices() {
    return this.servicesRepository.getAllServices();
  }
}
