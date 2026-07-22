import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Category } from '../../domain/entities/category.entity';
import { ICategoriesRepository } from '../../domain/interfaces/categories.repository.interface';
import { ICategoryMapper } from '../mappers/category.mapper.interface';

@Injectable()
export class PrismaCategoriesRepository implements ICategoriesRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: ICategoryMapper,
  ) {}

  async findAll(includeInactive = false): Promise<Category[]> {
    const list = await this.prisma.categories.findMany({
      where: includeInactive ? {} : { is_active: true },
      orderBy: { name: 'asc' },
    });
    return list.map((item) => this.mapper.toDomain(item));
  }

  async findById(id: number): Promise<Category | null> {
    const record = await this.prisma.categories.findUnique({ where: { id } });
    return record ? this.mapper.toDomain(record) : null;
  }

  async findBySlug(slug: string): Promise<Category | null> {
    const record = await this.prisma.categories.findFirst({ where: { slug } });
    return record ? this.mapper.toDomain(record) : null;
  }

  async save(category: Partial<Category>): Promise<Category> {
    const record = await this.prisma.categories.create({
      data: {
        name: category.name!,
        slug: category.slug!,
        description: category.description,
        is_active: category.is_active ?? true,
      },
    });
    return this.mapper.toDomain(record);
  }

  async update(id: number, category: Partial<Category>): Promise<Category> {
    const record = await this.prisma.categories.update({
      where: { id },
      data: {
        name: category.name,
        slug: category.slug,
        description: category.description,
        is_active: category.is_active,
      },
    });
    return this.mapper.toDomain(record);
  }
}
