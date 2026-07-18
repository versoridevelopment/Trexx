import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IAttributeTypesRepository } from './attribute-types.repository.interface';

@Injectable()
export class AttributeTypesRepository implements IAttributeTypesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.attribute_types.findMany({
      where: { is_active: true },
      include: {
        attribute_values: {
          where: { is_active: true },
          orderBy: { display_order: 'asc' },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  findOne(id: number) {
    return this.prisma.attribute_types.findUnique({
      where: { id },
      include: {
        attribute_values: { where: { is_active: true } },
      },
    });
  }

  findAllAdmin(includeInactive = false) {
    return this.prisma.attribute_types.findMany({
      where: includeInactive ? {} : { is_active: true },
      include: {
        attribute_values: { orderBy: { display_order: 'asc' } },
      },
      orderBy: { name: 'asc' },
    });
  }

  findOneAdmin(id: number) {
    return this.prisma.attribute_types.findUnique({
      where: { id },
      include: { attribute_values: true },
    });
  }

  create(data: any) {
    return this.prisma.attribute_types.create({ data });
  }

  update(id: number, data: any) {
    return this.prisma.attribute_types.update({ where: { id }, data });
  }

  updateActiveStatus(id: number, isActive: boolean) {
    return this.prisma.attribute_types.update({
      where: { id },
      data: { is_active: isActive },
    });
  }
}
