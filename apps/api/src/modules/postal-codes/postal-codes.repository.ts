import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IPostalCodesRepository } from './postal-codes.repository.interface';

@Injectable()
export class PostalCodesRepository implements IPostalCodesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.postal_codes.findMany();
  }

  findOne(id: number) {
    return this.prisma.postal_codes.findUnique({ where: { id } as any });
  }

  create(data: any) {
    return this.prisma.postal_codes.create({ data });
  }

  update(id: number, data: any) {
    return this.prisma.postal_codes.update({ where: { id } as any, data });
  }

  remove(id: number) {
    return this.prisma.postal_codes.delete({ where: { id } as any });
  }
}
