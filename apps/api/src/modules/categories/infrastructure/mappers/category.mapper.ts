import { Injectable } from '@nestjs/common';
import { categories as PrismaCategory } from '@prisma/client';
import { Category } from '../../domain/entities/category.entity';
import { ICategoryMapper } from './category.mapper.interface';

@Injectable()
export class CategoryMapper implements ICategoryMapper {
  toDomain(prismaCategory: PrismaCategory): Category {
    return Category.create(
      prismaCategory.id,
      prismaCategory.name,
      prismaCategory.slug,
      prismaCategory.description,
      prismaCategory.is_active,
      prismaCategory.created_at,
    );
  }
}
