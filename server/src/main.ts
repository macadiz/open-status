import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: solveHosts(configService),
  });

  await app.listen(process.env.PORT ?? 3000);
}

function solveHosts(configService: ConfigService) {
  const hostsVar = configService.get<string>('ALLOWED_HOSTS') ?? '';
  const hosts = hostsVar.split('|');

  return [...hosts];
}

void bootstrap();
