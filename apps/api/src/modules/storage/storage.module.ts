import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { IStorageRepository } from './storage.repository.interface';
import { StorageRepository } from './storage.repository';

@Module({
  providers: [
    StorageService,
    { provide: IStorageRepository, useClass: StorageRepository },
  ],
  exports: [StorageService],
})
export class StorageModule {}
