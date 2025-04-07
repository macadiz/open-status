import { Injectable } from '@nestjs/common';
import { APIParamTypes, Prisma, ServiceTypes } from '@prisma/client';
import { PrismaService } from 'src/infra/database/prisma.service';

@Injectable()
export class ServicesRepository {
  constructor(private prismaService: PrismaService) {}

  async addAPIService(
    alias: string,
    checkInterval: number,
    uptimeThreshold: number,
    url: string,
    method: string,
    queryParams?: Record<string, string>,
    headers?: Record<string, string>,
    body?: string,
  ) {
    return await this.prismaService.$transaction(async (client) => {
      const service = await client.service.create({
        data: {
          alias,
        },
      });

      const serviceConfig = await client.serviceConfig.create({
        data: {
          checkInterval,
          type: ServiceTypes.API,
          uptimeThreshold,
          service: {
            connect: {
              id: service.id,
            },
          },
        },
      });

      const apiConfig = await client.apiConfig.create({
        data: {
          url,
          method,
          serviceConfig: {
            connect: {
              id: serviceConfig.id,
            },
          },
          body,
        },
      });

      const paramsToCreate: Prisma.ApiConfigParamCreateManyInput[] = [];

      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          paramsToCreate.push({
            key,
            value,
            type: APIParamTypes.Header,
            apiConfigId: apiConfig.id,
          });
        });
      }

      if (queryParams) {
        Object.entries(queryParams).forEach(([key, value]) => {
          paramsToCreate.push({
            key,
            value,
            type: APIParamTypes.Query,
            apiConfigId: apiConfig.id,
          });
        });
      }

      if (paramsToCreate.length) {
        await client.apiConfigParam.createMany({
          data: paramsToCreate,
        });
      }

      return service;
    });
  }

  async addServiceLog(
    serviceId: string,
    isAvailable: boolean,
    message?: string,
  ) {
    await this.prismaService.serviceLog.create({
      data: {
        date: new Date(),
        isAvailable,
        message,
        serviceId,
      },
    });
  }

  async getAllApiServices() {
    return this.prismaService.service.findMany({
      include: {
        serviceConfig: {
          include: {
            apiConfig: {
              include: {
                params: true,
              },
            },
          },
        },
      },
      where: {
        serviceConfig: {
          type: ServiceTypes.API,
        },
      },
    });
  }

  async getAllServices() {
    return this.prismaService.service.findMany({
      include: {
        serviceConfig: {
          include: {
            apiConfig: {
              include: {
                params: true,
              },
            },
          },
        },
      },
    });
  }
}
