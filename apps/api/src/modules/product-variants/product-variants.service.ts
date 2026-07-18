import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';

@Injectable()
export class ProductVariantsService {
  constructor(private readonly prisma: PrismaService) {}

  // Público: solo variantes activas
  findByProduct(productId: number) {
    return this.prisma.product_variants.findMany({
      where: { product_id: productId, is_active: true },
      include: {
        variant_attributes: {
          include: {
            attribute_values: { include: { attribute_types: true } }
          }
        }
      },
      orderBy: { id: 'asc' }
    })
  }

  // Admin: todas las variantes del producto
  findByProductAdmin(productId: number) {
    return this.prisma.product_variants.findMany({
      where: { product_id: productId },
      include: {
        variant_attributes: {
          include: {
            attribute_values: { include: { attribute_types: true } }
          }
        }
      },
      orderBy: { id: 'asc' }
    })
  }

  findAll() {
    return this.prisma.product_variants.findMany({
      where: { is_active: true },
      include: {
        variant_attributes: {
          include: {
            attribute_values: {
              include: {
                attribute_types: true,
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const record = await this.prisma.product_variants.findUnique({
      where: { id },
      include: {
        variant_attributes: {
          include: {
            attribute_values: {
              include: {
                attribute_types: true,
              },
            },
          },
        },
      },
    });
    if (!record || !record.is_active) {
      throw new NotFoundException(`ProductVariant #${id} not found`);
    }
    return record;
  }

  async findOneAdmin(id: number) {
    const record = await this.prisma.product_variants.findUnique({
      where: { id },
      include: {
        variant_attributes: {
          include: {
            attribute_values: {
              include: {
                attribute_types: true,
              },
            },
          },
        },
      },
    });
    if (!record) throw new NotFoundException(`Variant #${id} not found`);
    return record;
  }

  create(dto: CreateProductVariantDto) {
    const { attribute_value_ids, ...rest } = dto as any;
    return this.prisma.product_variants.create({
      data: {
        ...rest,
        variant_attributes: attribute_value_ids && attribute_value_ids.length > 0 ? {
          create: attribute_value_ids.map((id: number) => ({
            attribute_value_id: id,
          })),
        } : undefined,
      },
      include: {
        variant_attributes: {
          include: {
            attribute_values: {
              include: {
                attribute_types: true,
              },
            },
          },
        },
      },
    });
  }

  async update(id: number, dto: UpdateProductVariantDto) {
    await this.findOneAdmin(id);
    const { attribute_value_ids, ...rest } = dto as any;
    return this.prisma.product_variants.update({
      where: { id },
      data: {
        ...rest,
        variant_attributes: attribute_value_ids !== undefined ? {
          deleteMany: {},
          create: attribute_value_ids.map((valId: number) => ({
            attribute_value_id: valId,
          })),
        } : undefined,
      },
      include: {
        variant_attributes: {
          include: {
            attribute_values: {
              include: {
                attribute_types: true,
              },
            },
          },
        },
      },
    });
  }

  async remove(id: number) {
    const variant = await this.findOneAdmin(id)
    return this.prisma.product_variants.update({
      where: { id },
      data: { is_active: false }
    })
  }

  async restore(id: number) {
    const variant = await this.prisma.product_variants.findUnique({ where: { id } })
    if (!variant) throw new NotFoundException(`Variant #${id} not found`)
    if (variant.is_active) throw new BadRequestException(`Variant #${id} is already active`)
    return this.prisma.product_variants.update({
      where: { id },
      data: { is_active: true }
    })
  }
}
