import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IProductVariantsRepository } from './product-variants.repository.interface';

const variantIncludes = {
  variant_attributes: {
    include: {
      attribute_values: { include: { attribute_types: true } },
    },
  },
};

@Injectable()
export class ProductVariantsRepository implements IProductVariantsRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Público: solo variantes activas
  findByProduct(productId: number) {
    return this.prisma.product_variants.findMany({
      where: { product_id: productId, is_active: true },
      include: variantIncludes,
      orderBy: { id: 'asc' },
    });
  }

  // Admin: todas las variantes del producto
  findByProductAdmin(productId: number) {
    return this.prisma.product_variants.findMany({
      where: { product_id: productId },
      include: variantIncludes,
      orderBy: { id: 'asc' },
    });
  }

  findAll() {
    return this.prisma.product_variants.findMany({
      where: { is_active: true },
      include: variantIncludes,
    });
  }

  findOne(id: number) {
    return this.prisma.product_variants.findUnique({
      where: { id },
      include: variantIncludes,
    });
  }

  findOneAdmin(id: number) {
    return this.prisma.product_variants.findUnique({
      where: { id },
      include: variantIncludes,
    });
  }

  create(data: any) {
    const { attribute_value_ids, ...rest } = data;
    return this.prisma.product_variants.create({
      data: {
        ...rest,
        variant_attributes:
          attribute_value_ids && attribute_value_ids.length > 0
            ? {
                create: attribute_value_ids.map((id: number) => ({
                  attribute_value_id: id,
                })),
              }
            : undefined,
      },
      include: variantIncludes,
    });
  }

  update(id: number, data: any) {
    const { attribute_value_ids, ...rest } = data;
    return this.prisma.product_variants.update({
      where: { id },
      data: {
        ...rest,
        variant_attributes:
          attribute_value_ids !== undefined
            ? {
                deleteMany: {},
                create: attribute_value_ids.map((valId: number) => ({
                  attribute_value_id: valId,
                })),
              }
            : undefined,
      },
      include: variantIncludes,
    });
  }

  updateActiveStatus(id: number, isActive: boolean) {
    return this.prisma.product_variants.update({
      where: { id },
      data: { is_active: isActive },
    });
  }
}
