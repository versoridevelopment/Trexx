import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IAddressesRepository } from './addresses.repository.interface';

@Injectable()
export class AddressesRepository implements IAddressesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId?: string) {
    return this.prisma.addresses.findMany({
      where: {
        is_active: true,
        ...(userId ? { user_id: userId } : {}),
      },
    });
  }

  findOne(id: number) {
    return this.prisma.addresses.findUnique({ where: { id } });
  }

  create(data: any) {
    return this.prisma.addresses.create({ data });
  }

  update(id: number, data: any) {
    return this.prisma.addresses.update({ where: { id }, data });
  }

  updateActiveStatus(id: number, isActive: boolean) {
    return this.prisma.addresses.update({
      where: { id },
      data: { is_active: isActive },
    });
  }
}
