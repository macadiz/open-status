import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  forwardRef,
  Inject,
} from '@nestjs/common';
import axios, { AxiosError, Method } from 'axios';
import { ServicesService } from './services.service';
import { JsonValue } from '@prisma/client/runtime/library';
import { IOTypes } from '@prisma/client';

export interface ServiceConfig {
  id: string;
  alias: string;
  checkInterval: number;
  url: string;
  method: Method;
  queryParams?: Record<string, string>;
  headers?: Record<string, string>;
  body?: string | JsonValue;
  bodyType?: IOTypes | null;
  expectedResponse?: string | null;
  responseType?: IOTypes | null;
}

@Injectable()
export class ServicesMonitorService implements OnModuleInit, OnModuleDestroy {
  private intervalMap: Map<string, NodeJS.Timeout> = new Map();
  private services: ServiceConfig[] = [];

  constructor(
    @Inject(forwardRef(() => ServicesService))
    private servicesService: ServicesService,
    // Inject your HTTP service or any other dependencies
  ) {}

  async onModuleInit() {
    // Load services from database or config
    await this.loadServices();
    // Initialize monitoring for all services
    this.startAllMonitors();
  }

  onModuleDestroy() {
    // Clean up all intervals when application shuts down
    this.stopAllMonitors();
  }

  private async loadServices() {
    this.services = await this.servicesService.getAllAPIServices();
  }

  private startAllMonitors() {
    this.services.forEach((service) => {
      this.startMonitoring(service);
    });
  }

  startMonitoring(service: ServiceConfig) {
    // Stop existing interval if any
    if (this.intervalMap.has(service.id)) {
      this.stopMonitoring(service.id);
    }

    // Create new interval
    const intervalId = setInterval(() => {
      this.checkServiceStatus(service);
    }, service.checkInterval * 1000);

    // Store reference to the interval
    this.intervalMap.set(service.id, intervalId);
    console.log(
      `Started monitoring ${service.alias} every ${service.checkInterval} seconds`,
    );
  }

  stopMonitoring(serviceId: string) {
    const interval = this.intervalMap.get(serviceId);
    if (interval) {
      clearInterval(interval);
      this.intervalMap.delete(serviceId);
      console.log(`Stopped monitoring service ${serviceId}`);
    }
  }

  stopAllMonitors() {
    this.intervalMap.forEach((interval, serviceId) => {
      clearInterval(interval);
      console.log(`Stopped monitoring service ${serviceId}`);
    });
    this.intervalMap.clear();
  }

  checkServiceStatus(service: ServiceConfig) {
    console.log(`Checking status of ${service.alias}`);

    const headers = this.buildAdditionalHeaders(service);

    axios({
      url: service.url,
      method: service.method,
      params: service.queryParams,
      data: service.body,
      headers,
      transformResponse: (r) => r as string,
    })
      .then(async (response) => {
        console.log(`Getting status of ${service.alias}`);
        const isSuccess = response.status >= 200 && response.status < 300;
        const isExpectedType = this.checkResponseType(
          response.data,
          service.responseType,
        );
        const isExpectedResponse = this.checkExpectedResponse(
          response.data,
          service.expectedResponse,
        );

        const isAvailable = isSuccess && isExpectedType && isExpectedResponse;

        await this.servicesService.addServiceLog(
          service.id,
          isAvailable,
          JSON.stringify(response.data),
        );
      })
      .catch(async (error) => {
        const axiosError = error as AxiosError;
        console.error(`Error monitoring ${service.alias}:`, axiosError.message);
        await this.servicesService.addServiceLog(
          service.id,
          false,
          JSON.stringify(axiosError.response?.data),
        );
      });
  }

  buildAdditionalHeaders(service: ServiceConfig) {
    const additionalHeaders: Record<string, string> = !service.headers
      ? {}
      : { ...service.headers };
    if (service.body && service.bodyType) {
      if (service.bodyType === 'XML') {
        additionalHeaders['Content-Type'] = 'text/xml';
      }
    }

    return Object.keys(additionalHeaders).length > 0
      ? additionalHeaders
      : undefined;
  }

  checkExpectedResponse(responseData?: any, expectedResponse?: string | null) {
    if (!expectedResponse || !responseData) {
      return true;
    }

    const sanitizedResponse = this.sanitizeResponse(responseData as string);
    const sanitizedExpectedResponse = this.sanitizeResponse(expectedResponse);

    return sanitizedResponse === sanitizedExpectedResponse;
  }

  sanitizeResponse(responseData: string) {
    return (
      responseData
        // Remove spaces around colons in key-value pairs
        .replace(/"\s*:\s*"/g, '":"')
        // Remove spaces after opening braces/brackets
        .replace(/[{[]\s+/g, (match) => match[0])
        // Remove spaces before closing braces/brackets
        .replace(/\s+[}\]]/g, (match) => match[match.length - 1])
        // Remove spaces between attribute value and name in HTML/XML tags
        .replace(/=\s+"/g, '="')
        // Remove spaces after opening tags and before closing tags
        .replace(/<\s+/g, '<')
        .replace(/\s+>/g, '>')
        // Remove spaces around XML/HTML tag attributes
        .replace(/"\s+/g, '" ')
        .replace(/\s+[a-zA-Z]+=/, (match) => ' ' + match.trim())
        // Handle beginning and ending spaces inside tags
        .replace(/>\s+([^<]*?)\s+</g, '>$1<')
    );
  }

  checkResponseType(responseData?: any, responseType?: IOTypes | null) {
    if (!responseType || !responseData) {
      return true;
    }
    const stringData = responseData as string;
    switch (responseType) {
      case 'Document':
        return this.checkHTML(stringData);
      case 'JSON':
        return this.checkJSON(stringData);
      case 'XML':
        return this.checkXML(stringData);
      default:
        return true;
    }
  }

  checkHTML(responseData: string) {
    const parser = new DOMParser();
    try {
      parser.parseFromString(responseData, 'text/html');
      return true;
    } catch {
      return false;
    }
  }

  checkJSON(responseData: string) {
    try {
      JSON.parse(responseData);
      return true;
    } catch {
      return false;
    }
  }

  checkXML(responseData: string) {
    const parser = new DOMParser();
    try {
      const domEl = parser.parseFromString(responseData, 'text/xml');

      return domEl.documentElement.nodeName === 'parsererror';
    } catch {
      return false;
    }
  }

  // Add methods to dynamically add/remove/update services
  addService(service: ServiceConfig) {
    this.services.push(service);
    this.startMonitoring(service);
    // Optionally persist to database
  }

  /*async updateServiceInterval(serviceId: string, newInterval: number) {
    const service = this.services.find((s) => s.id === serviceId);
    if (service) {
      service.checkInterval = newInterval;
      this.startMonitoring(service); // This will restart with new interval
      // Optionally update in database
    }
  }*/

  /*async removeService(serviceId: string) {
    this.stopMonitoring(serviceId);
    this.services = this.services.filter((s) => s.id !== serviceId);
    // Optionally remove from database
  }*/
}
