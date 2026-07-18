import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { IProductsRepository } from './products.repository.interface';
import { ProductsRepository } from './products.repository';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [PrismaModule, StorageModule],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    { provide: IProductsRepository, useClass: ProductsRepository },
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
