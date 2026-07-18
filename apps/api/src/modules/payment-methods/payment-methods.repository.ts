import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IPaymentMethodsRepository } from './payment-methods.repository.interface';

@Injectable()
export class PaymentMethodsRepository implements IPaymentMethodsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.payment_methods.findMany();
  }

  findOne(id: number) {
    return this.prisma.payment_methods.findUnique({ where: { id } as any });
  }

  create(data: any) {
    return this.prisma.payment_methods.create({ data });
  }

  update(id: number, data: any) {
    return this.prisma.payment_methods.update({ where: { id } as any, data });
  }

  remove(id: number) {
    return this.prisma.payment_methods.delete({ where: { id } as any });
  }
}
