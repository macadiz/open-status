import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [resolve(process.cwd(), '../.env')],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(process.cwd(), 'web'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
