import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  public findAll(categorySlug?: string) {
    return this.prisma.products.findMany({
      where: {
        is_active: true,
        ...(categorySlug ? { categories: { slug: categorySlug } } : {}),
      },
      include: {
        categories: true,
        product_images: true,
        product_variants: {
          where: { is_active: true },
          include: {
            variant_attributes: {
              include: {
                attribute_values: { include: { attribute_types: true } },
              },
            },
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  public findOne(id: number) {
    return this.prisma.products.findUnique({
      where: { id },
      include: {
        categories: true,
        product_images: true,
        product_variants: {
          where: { is_active: true },
          include: {
            variant_attributes: {
              include: {
                attribute_values: { include: { attribute_types: true } },
              },
            },
          },
        },
      },
    });
  }

  public findAllAdmin(includeInactive = false) {
    return this.prisma.products.findMany({
      where: includeInactive ? {} : { is_active: true },
      include: {
        categories: true,
        product_images: true,
        product_variants: {
          include: {
            variant_attributes: {
              include: {
                attribute_values: { include: { attribute_types: true } },
              },
            },
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  public findOneAdmin(id: number) {
    return this.prisma.products.findUnique({
      where: { id },
      include: {
        categories: true,
        product_images: true,
        product_variants: {
          include: {
            variant_attributes: {
              include: {
                attribute_values: { include: { attribute_types: true } },
              },
            },
          },
        },
      },
    });
  }

  public create(data: any) {
    return this.prisma.products.create({
      data,
      include: {
        categories: true,
        product_images: true,
      },
    });
  }

  public async categoryExists(id: number): Promise<boolean> {
    const count = await this.prisma.categories.count({
      where: { id, is_active: true },
    });
    return count > 0;
  }

  public update(id: number, data: any) {
    return this.prisma.products.update({
      where: { id },
      data,
      include: {
        categories: true,
        product_images: true,
      },
    });
  }

  public updateActiveStatus(id: number, isActive: boolean) {
    return this.prisma.products.update({
      where: { id },
      data: { is_active: isActive },
      include: {
        categories: true,
        product_images: true,
      },
    });
  }
}
