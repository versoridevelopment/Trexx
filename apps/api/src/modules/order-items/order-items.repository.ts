import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IOrderItemsRepository } from './order-items.repository.interface';

@Injectable()
export class OrderItemsRepository implements IOrderItemsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(includeInactive = false) {
    return this.prisma.order_items.findMany({
      where: includeInactive ? {} : { is_active: true },
    });
  }

  findOne(id: number) {
    return this.prisma.order_items.findUnique({ where: { id } });
  }

  create(data: any) {
    return this.prisma.order_items.create({ data });
  }

  update(id: number, data: any) {
    return this.prisma.order_items.update({ where: { id }, data });
  }

  updateActiveStatus(id: number, isActive: boolean) {
    return this.prisma.order_items.update({
      where: { id },
      data: { is_active: isActive },
    });
  }
}
