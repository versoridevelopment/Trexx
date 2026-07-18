import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

const productIncludes = {
  categories: true,
  product_images: true,
  color: true,
  parent: {
    include: {
      color: true,
      product_images: true,
      variations: {
        include: {
          color: true,
          product_images: true,
          product_variants: {
            include: {
              variant_attributes: {
                include: {
                  attribute_values: { include: { attribute_types: true } }
                }
              }
            }
          }
        }
      }
    }
  },
  variations: {
    include: {
      color: true,
      product_images: true,
      product_variants: {
        include: {
          variant_attributes: {
            include: {
              attribute_values: { include: { attribute_types: true } }
            }
          }
        }
      }
    }
  },
  product_variants: {
    where: { is_active: true },
    include: {
      variant_attributes: {
        include: {
          attribute_values: { include: { attribute_types: true } },
        },
      },
    },
  }
};

const productIncludesAdmin = {
  ...productIncludes,
  product_variants: {
    include: {
      variant_attributes: {
        include: {
          attribute_values: { include: { attribute_types: true } },
        },
      },
    },
  }
};

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  public findAll(categorySlug?: string) {
    return this.prisma.products.findMany({
      where: {
        is_active: true,
        ...(categorySlug ? { categories: { slug: categorySlug } } : {}),
      },
      include: productIncludes,
      orderBy: { created_at: 'desc' },
    });
  }

  public findOne(id: number) {
    return this.prisma.products.findUnique({
      where: { id },
      include: productIncludes,
    });
  }

  public findBySlug(slug: string) {
    return this.prisma.products.findUnique({
      where: { slug },
      include: productIncludes,
    });
  }

  public findAllAdmin(includeInactive = false) {
    return this.prisma.products.findMany({
      where: includeInactive ? {} : { is_active: true },
      include: productIncludesAdmin,
      orderBy: { created_at: 'desc' },
    });
  }

  public findOneAdmin(id: number) {
    return this.prisma.products.findUnique({
      where: { id },
      include: productIncludesAdmin,
    });
  }

  public create(data: any) {
    return this.prisma.products.create({
      data,
      include: productIncludesAdmin,
    });
  }

  public async createWithVariants(productData: any, variants: any[]): Promise<number> {
    return this.prisma.$transaction(async (tx) => {
      const product = await tx.products.create({
        data: productData,
      });

      if (variants.length > 0) {
        for (const variant of variants) {
          await tx.product_variants.create({
            data: {
              product_id: product.id,
              sku: variant.sku,
              stock: variant.stock,
              price_modifier: variant.priceModifier || 0,
              variant_attributes: {
                create: (variant.attributeValues || []).map((av: any) => ({
                  attribute_value_id: av.id,
                })),
              },
            },
          });
        }
      }
      return product.id;
    });
  }

  public async skuExists(sku: string): Promise<boolean> {
    const count = await this.prisma.product_variants.count({ where: { sku } });
    return count > 0;
  }

  public async categoryExists(id: number): Promise<boolean> {
    const count = await this.prisma.categories.count({
      where: { id, is_active: true },
    });
    return count > 0;
  }

  public async slugExists(slug: string): Promise<boolean> {
    const count = await this.prisma.products.count({
      where: { slug },
    });
    return count > 0;
  }

  public findAllColors() {
    return this.prisma.colors.findMany({
      where: { is_active: true },
      orderBy: { display_order: 'asc' },
    });
  }

  public createManyColors(data: any[]) {
    return this.prisma.colors.createMany({
      data,
    });
  }

  public update(id: number, data: any) {
    return this.prisma.products.update({
      where: { id },
      data,
      include: productIncludesAdmin,
    });
  }

  public updateActiveStatus(id: number, isActive: boolean) {
    return this.prisma.products.update({
      where: { id },
      data: { is_active: isActive },
      include: productIncludesAdmin,
    });
  }
}
