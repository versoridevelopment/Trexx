import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { CategoriesController } from './presentation/controllers/categories.controller';

// Domain & Infrastructure
import { ICategoriesRepository } from './domain/interfaces/categories.repository.interface';
import { PrismaCategoriesRepository } from './infrastructure/persistence/prisma-categories.repository';
import { ICategoryMapper } from './infrastructure/mappers/category.mapper.interface';
import { CategoryMapper } from './infrastructure/mappers/category.mapper';

// Use Cases
import { GetAllCategoriesUseCase } from './application/use-cases/get-all-categories.use-case';
import { GetOneCategoryUseCase } from './application/use-cases/get-one-category.use-case';
import { CreateCategoryUseCase } from './application/use-cases/create-category.use-case';
import { UpdateCategoryUseCase } from './application/use-cases/update-category.use-case';
import { RemoveCategoryUseCase } from './application/use-cases/remove-category.use-case';
import { RestoreCategoryUseCase } from './application/use-cases/restore-category.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [CategoriesController],
  providers: [
    {
      provide: ICategoriesRepository,
      useClass: PrismaCategoriesRepository,
    },
    {
      provide: ICategoryMapper,
      useClass: CategoryMapper,
    },
    GetAllCategoriesUseCase,
    GetOneCategoryUseCase,
    CreateCategoryUseCase,
    UpdateCategoryUseCase,
    RemoveCategoryUseCase,
    RestoreCategoryUseCase,
  ],
  exports: [
    ICategoriesRepository,
    GetAllCategoriesUseCase,
    GetOneCategoryUseCase,
  ],
})
export class CategoriesModule {}
