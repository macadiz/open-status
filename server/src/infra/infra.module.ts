import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { CryptoService } from './crypto/crypto.service';

@Module({
  providers: [PrismaService, CryptoService],
  exports: [PrismaService, CryptoService],
})
export class InfraModule {}
