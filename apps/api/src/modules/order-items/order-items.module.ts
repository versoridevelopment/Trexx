import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { OrderItemsService } from './order-items.service';
import { OrderItemsController } from './order-items.controller';
import { IOrderItemsRepository } from './order-items.repository.interface';
import { OrderItemsRepository } from './order-items.repository';

@Module({
  imports: [PrismaModule],
  controllers: [OrderItemsController],
  providers: [
    OrderItemsService,
    { provide: IOrderItemsRepository, useClass: OrderItemsRepository },
  ],
  exports: [OrderItemsService],
})
export class OrderItemsModule {}
