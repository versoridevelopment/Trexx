import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ProductVariantsService } from './product-variants.service';
import { ProductVariantsController } from './product-variants.controller';
import { IProductVariantsRepository } from './product-variants.repository.interface';
import { ProductVariantsRepository } from './product-variants.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ProductVariantsController],
  providers: [
    ProductVariantsService,
    { provide: IProductVariantsRepository, useClass: ProductVariantsRepository },
  ],
  exports: [ProductVariantsService],
})
export class ProductVariantsModule {}
