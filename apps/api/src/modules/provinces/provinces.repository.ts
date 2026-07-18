import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IProvincesRepository } from './provinces.repository.interface';

@Injectable()
export class ProvincesRepository implements IProvincesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.provinces.findMany();
  }

  findOne(id: number) {
    return this.prisma.provinces.findUnique({ where: { id } as any });
  }

  create(data: any) {
    return this.prisma.provinces.create({ data });
  }

  update(id: number, data: any) {
    return this.prisma.provinces.update({ where: { id } as any, data });
  }

  remove(id: number) {
    return this.prisma.provinces.delete({ where: { id } as any });
  }
}
