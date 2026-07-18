import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IPaymentsRepository } from './payments.repository.interface';

@Injectable()
export class PaymentsRepository implements IPaymentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(includeInactive = false) {
    return this.prisma.payments.findMany({
      where: includeInactive ? {} : { is_active: true },
    });
  }

  findOne(id: number) {
    return this.prisma.payments.findUnique({ where: { id } });
  }

  create(data: any) {
    return this.prisma.payments.create({ data });
  }

  update(id: number, data: any) {
    return this.prisma.payments.update({ where: { id }, data });
  }

  updateActiveStatus(id: number, isActive: boolean) {
    return this.prisma.payments.update({
      where: { id },
      data: { is_active: isActive },
    });
  }
}
