import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { IOrdersRepository } from './orders.repository.interface';
import { OrdersRepository } from './orders.repository';

@Module({
  imports: [PrismaModule],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    { provide: IOrdersRepository, useClass: OrdersRepository },
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
