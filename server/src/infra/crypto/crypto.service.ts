import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import * as argon2 from 'argon2';
import { Environment } from '../environment';

@Injectable()
export class CryptoService {
  encryptionKey: Buffer | undefined;

  constructor(private readonly configService: ConfigService) {
    const base64Key = this.configService.get<string>(
      Environment.ENCRYPTION_KEY,
    ); // ENCRYPTION KEY MUST BE A BASE64 STRING OF A STRING WITH LENGTH OF 32 DUE TO AES-256

    if (!base64Key) {
      throw Error('[Critical] There must be an ENCRYPTION_KEY');
    }

    this.encryptionKey = Buffer.from(base64Key, 'base64');
  }

  encrypt(text: string) {
    if (!this.encryptionKey) {
      Logger.warn('Encryption key is empty', 'CryptoService');
    }

    const iv = crypto.randomBytes(16); // Initialization vector
    const cipher = crypto.createCipheriv(
      'aes-256-gcm',
      Buffer.from(this.encryptionKey!),
      iv,
    );
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');
    return `${iv.toString('hex')}:${encrypted}:${authTag}`;
  }

  decrypt(encryptedText: string) {
    if (!this.encryptionKey) {
      Logger.warn('Encryption key is empty', 'ENCRYPTION');
    }

    const parts = encryptedText.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const encrypted = parts[1];
    const authTag = Buffer.from(parts[2], 'hex');
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      Buffer.from(this.encryptionKey!),
      iv,
    );
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  async hash(password: string): Promise<string> {
    return argon2.hash(password);
  }

  async verifyHashed(hashed: string, password: string): Promise<boolean> {
    return await argon2.verify(hashed, password);
  }
}
