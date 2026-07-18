import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { OrderShippingsService } from './order-shippings.service';
import { OrderShippingsController } from './order-shippings.controller';
import { IOrderShippingsRepository } from './order-shippings.repository.interface';
import { OrderShippingsRepository } from './order-shippings.repository';

@Module({
  imports: [PrismaModule],
  controllers: [OrderShippingsController],
  providers: [
    OrderShippingsService,
    { provide: IOrderShippingsRepository, useClass: OrderShippingsRepository },
  ],
  exports: [OrderShippingsService],
})
export class OrderShippingsModule {}
