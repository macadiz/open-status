import { Injectable } from '@nestjs/common';
import { ServicesRepository } from './services.repository';
import { Method } from 'axios';
import { ServiceConfig, ServicesMonitorService } from './services.schedule';
import { CryptoService } from 'src/infra/crypto/crypto.service';
import { IOTypes } from '@prisma/client';

@Injectable()
export class ServicesService {
  constructor(
    private servicesScheduleService: ServicesMonitorService,
    private cryptoService: CryptoService,
    private servicesRepository: ServicesRepository,
  ) {}

  async addAPIService(
    alias: string,
    checkInterval: number,
    warningThreshold: number,
    dangerThreshold: number,
    url: string,
    method: Method,
    queryParams?: Record<string, string>,
    headers?: Record<string, string>,
    body?: string,
    bodyType?: IOTypes,
    expectedResponse?: string,
    responseType?: IOTypes,
  ) {
    const finalQueryParams = queryParams
      ? this.encryptRecord(queryParams)
      : undefined;

    const finalHeaders = headers ? this.encryptRecord(headers) : undefined;

    const finalBody = body ? this.cryptoService.encrypt(body) : undefined;

    const service = await this.servicesRepository.addAPIService(
      alias,
      checkInterval,
      warningThreshold,
      dangerThreshold,
      url,
      method,
      finalQueryParams,
      finalHeaders,
      finalBody,
      bodyType,
      expectedResponse,
      responseType,
    );

    this.servicesScheduleService.addService({
      ...service,
      checkInterval,
      url,
      method,
      queryParams,
      headers,
      body,
      bodyType,
      expectedResponse,
      responseType,
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
        warningThreshold: serviceConfig.warningThreshold,
        dangerThreshold: serviceConfig.dangerThreshold,
        checkInterval: serviceConfig.checkInterval,
        method: apiConfig.method as Method,
        headers,
        params,
        body: apiConfig.body,
        bodyType: apiConfig.bodyType,
        expectedResponse: apiConfig.expectedResponse,
        responseType: apiConfig.responseType,
      };
    });

    return mappedApiServices;
  }

  async getAllServices(decrypted?: boolean) {
    let allServices = await this.servicesRepository.getAllServices();

    if (decrypted) {
      allServices = allServices.map((service) => {
        const serviceConfig = service.serviceConfig!;
        const apiConfig = serviceConfig.apiConfig;

        if (apiConfig) {
          apiConfig.params = apiConfig.params.map((param) => {
            return {
              ...param,
              value: this.cryptoService.decrypt(param.value),
            };
          });
          if (apiConfig.body) {
            apiConfig.body = this.cryptoService.decrypt(apiConfig.body);
          }
        }

        return service;
      });
    }

    return allServices;
  }

  async getServicesSummary(startDate: Date, endDate: Date) {
    const servicesUptime = await this.servicesRepository.getAllServicesUptime(
      startDate,
      endDate,
    );

    const servicesUptimeWithStatus = servicesUptime.map((service) => {
      const status = this.solveUptimeStatus(
        service.uptime,
        service.warningThreshold,
        service.dangerThreshold,
      );
      return {
        ...service,
        status,
      };
    });

    return {
      uptime: servicesUptimeWithStatus,
      status: this.solveGeneralStatus(
        servicesUptimeWithStatus.map((s) => s.status),
      ),
      lastUpdated: servicesUptimeWithStatus[0]?.lastEventDate,
    };
  }

  private solveUptimeStatus(
    uptime: number,
    warningThreshold: number,
    dangerThreshold: number,
  ) {
    if (uptime <= dangerThreshold) {
      return 'danger';
    }

    if (uptime <= warningThreshold) {
      return 'warning';
    }

    return 'success';
  }

  private solveGeneralStatus(statuses: string[]) {
    if (statuses.includes('danger')) {
      return 'danger';
    }

    if (statuses.includes('warning')) {
      return 'warning';
    }

    return 'success';
  }

  private encryptRecord(recordToEncrypt: Record<string, string>) {
    return Object.entries(recordToEncrypt).reduce(
      (acc, [key, value]) => {
        acc[key] = this.cryptoService.encrypt(value);
        return acc;
      },
      {} as Record<string, string>,
    );
  }
}
