import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IPaymentStatusesRepository } from './payment-statuses.repository.interface';

@Injectable()
export class PaymentStatusesRepository implements IPaymentStatusesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.payment_statuses.findMany();
  }

  findOne(id: number) {
    return this.prisma.payment_statuses.findUnique({ where: { id } as any });
  }

  create(data: any) {
    return this.prisma.payment_statuses.create({ data });
  }

  update(id: number, data: any) {
    return this.prisma.payment_statuses.update({ where: { id } as any, data });
  }

  remove(id: number) {
    return this.prisma.payment_statuses.delete({ where: { id } as any });
  }
}
