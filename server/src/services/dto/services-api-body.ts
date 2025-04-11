import { IOTypes } from '@prisma/client';
import { Method } from 'axios';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class ServiceAPIBodyDTO {
  @IsString()
  alias: string;
  @IsNumber()
  checkInterval: number;
  @IsNumber()
  dangerThreshold: number;
  @IsNumber()
  warningThreshold: number;
  @IsString()
  url: string;
  @IsString()
  method: Method;
  @IsObject()
  @IsOptional()
  queryParams?: Record<string, string>;
  @IsObject()
  @IsOptional()
  headers?: Record<string, string>;
  @IsString()
  @IsOptional()
  body?: string;
  @IsString()
  @IsOptional()
  bodyType?: IOTypes;
  @IsString()
  @IsOptional()
  expectedResponse?: string;
  @IsString()
  @IsOptional()
  responseType?: IOTypes;
}
