import { Injectable } from '@nestjs/common';
import { ICategoriesRepository } from '../../domain/interfaces/categories.repository.interface';
import { CategoryNotFoundError } from '../../domain/exceptions/category.exceptions';

@Injectable()
export class GetOneCategoryUseCase {
  constructor(private readonly repository: ICategoriesRepository) {}

  async execute(idOrSlug: string | number) {
    let record;
    if (typeof idOrSlug === 'number') {
      record = await this.repository.findById(idOrSlug);
    } else {
      record = await this.repository.findBySlug(idOrSlug);
    }

    if (!record || !record.is_active) {
      throw new CategoryNotFoundError(idOrSlug);
    }
    return record;
  }

  async executeAdmin(id: number) {
    const record = await this.repository.findById(id);
    if (!record) throw new CategoryNotFoundError(id);
    return record;
  }
}
