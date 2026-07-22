import { Injectable } from '@nestjs/common';
import { ICategoriesRepository } from '../../domain/interfaces/categories.repository.interface';
import { CategoryNotFoundError } from '../../domain/exceptions/category.exceptions';

@Injectable()
export class RemoveCategoryUseCase {
  constructor(private readonly repository: ICategoriesRepository) {}

  async execute(id: number) {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new CategoryNotFoundError(id);
    }
    return this.repository.update(id, { is_active: false });
  }
}
