import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IOrderShippingsRepository } from './order-shippings.repository.interface';

@Injectable()
export class OrderShippingsRepository implements IOrderShippingsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.order_shippings.findMany();
  }

  findOne(id: number) {
    return this.prisma.order_shippings.findUnique({ where: { id } as any });
  }

  create(data: any) {
    return this.prisma.order_shippings.create({ data });
  }

  update(id: number, data: any) {
    return this.prisma.order_shippings.update({ where: { id } as any, data });
  }

  remove(id: number) {
    return this.prisma.order_shippings.delete({ where: { id } as any });
  }
}
