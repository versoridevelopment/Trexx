import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { OrderStatusesService } from './order-statuses.service';
import { OrderStatusesController } from './order-statuses.controller';
import { IOrderStatusesRepository } from './order-statuses.repository.interface';
import { OrderStatusesRepository } from './order-statuses.repository';

@Module({
  imports: [PrismaModule],
  controllers: [OrderStatusesController],
  providers: [
    OrderStatusesService,
    { provide: IOrderStatusesRepository, useClass: OrderStatusesRepository },
  ],
  exports: [OrderStatusesService],
})
export class OrderStatusesModule {}
