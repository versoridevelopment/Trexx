import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ICitysRepository } from './cities.repository.interface';

@Injectable()
export class CitysRepository implements ICitysRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.cities.findMany();
  }

  findOne(id: number) {
    return this.prisma.cities.findUnique({ where: { id } as any });
  }

  create(data: any) {
    return this.prisma.cities.create({ data });
  }

  update(id: number, data: any) {
    return this.prisma.cities.update({ where: { id } as any, data });
  }

  remove(id: number) {
    return this.prisma.cities.delete({ where: { id } as any });
  }
}
