import { Injectable } from '@nestjs/common';
import { IStorageRepository } from './storage.repository.interface';

@Injectable()
export class StorageService {
  constructor(private readonly repository: IStorageRepository) {}

  async uploadFile(
    fileBuffer: Buffer,
    fileName: string,
    mimeType: string,
    folder = 'products',
    bucketName = 'store-assets',
  ): Promise<string> {
    const fileExt = fileName.split('.').pop() || '';
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${folder}/${uniqueName}`;

    return this.repository.upload(fileBuffer, filePath, mimeType, bucketName);
  }
}
