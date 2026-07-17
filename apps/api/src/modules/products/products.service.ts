import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  // Mapeador auxiliar para inyectar la propiedad `image`
  private mapProduct(record: any) {
    if (!record) return record
    return {
      ...record,
      image: record.product_images?.[0]?.url || null,
      // Opcional: removemos product_images para no ensuciar el payload si no se usa
      // product_images: undefined 
    }
  }

  // Endpoint público: solo productos activos
  async findAll(categorySlug?: string) {
    const records = await this.prisma.products.findMany({
      where: {
        is_active: true,
        ...(categorySlug ? { categories: { slug: categorySlug } } : {})
      },
      include: {
        categories: true,
        product_images: true, // Incluimos las imágenes
        product_variants: {
          where: { is_active: true },
          include: {
            variant_attributes: {
              include: {
                attribute_values: { include: { attribute_types: true } }
              }
            }
          }
        }
      },
      orderBy: { created_at: 'desc' }
    })
    return records.map(this.mapProduct)
  }

  // Endpoint público: lanza 404 si no existe o está inactivo
  async findOne(id: number) {
    const record = await this.prisma.products.findUnique({
      where: { id },
      include: {
        categories: true,
        product_images: true,
        product_variants: {
          where: { is_active: true },
          include: {
            variant_attributes: {
              include: {
                attribute_values: { include: { attribute_types: true } }
              }
            }
          }
        }
      }
    })
    if (!record || !record.is_active) {
      throw new NotFoundException(`Product #${id} not found`)
    }
    return this.mapProduct(record)
  }

  // Admin: ve todos, activos e inactivos
  async findAllAdmin(includeInactive = false) {
    const records = await this.prisma.products.findMany({
      where: includeInactive ? {} : { is_active: true },
      include: {
        categories: true,
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
      },
      orderBy: { created_at: 'desc' }
    })
    return records.map(this.mapProduct)
  }

  // Admin: ve el producto aunque esté inactivo
  async findOneAdmin(id: number) {
    const record = await this.prisma.products.findUnique({
      where: { id },
      include: {
        categories: true,
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
    })
    if (!record) throw new NotFoundException(`Product #${id} not found`)
    return this.mapProduct(record)
  }

  create(dto: CreateProductDto) {
    return this.prisma.products.create({ data: dto as any })
  }

  async update(id: number, dto: UpdateProductDto) {
    await this.findOneAdmin(id)
    return this.prisma.products.update({ where: { id }, data: dto as any })
  }

  // Borrado lógico
  async remove(id: number) {
    await this.findOneAdmin(id)
    return this.prisma.products.update({
      where: { id },
      data: { is_active: false }
    })
  }

  // Reactivar
  async restore(id: number) {
    const record = await this.prisma.products.findUnique({ where: { id } })
    if (!record) throw new NotFoundException(`Product #${id} not found`)
    if (record.is_active) throw new BadRequestException(`Product #${id} is already active`)
    return this.prisma.products.update({
      where: { id },
      data: { is_active: true }
    })
  }
}
