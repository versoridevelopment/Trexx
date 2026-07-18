import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IOrderStatusesRepository } from './order-statuses.repository.interface';

@Injectable()
export class OrderStatusesRepository implements IOrderStatusesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.order_statuses.findMany();
  }

  findOne(id: number) {
    return this.prisma.order_statuses.findUnique({ where: { id } });
  }

  create(data: any) {
    return this.prisma.order_statuses.create({ data });
  }

  update(id: number, data: any) {
    return this.prisma.order_statuses.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.order_statuses.delete({ where: { id } });
  }
}
