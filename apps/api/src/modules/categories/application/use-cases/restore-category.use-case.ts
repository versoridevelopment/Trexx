import { Injectable } from '@nestjs/common';
import { ICategoriesRepository } from '../../domain/interfaces/categories.repository.interface';
import {
  CategoryNotFoundError,
  CategoryAlreadyActiveError,
} from '../../domain/exceptions/category.exceptions';

@Injectable()
export class RestoreCategoryUseCase {
  constructor(private readonly repository: ICategoriesRepository) {}

  async execute(id: number) {
    const record = await this.repository.findById(id);
    if (!record) throw new CategoryNotFoundError(id);
    if (record.is_active) throw new CategoryAlreadyActiveError(id);

    return this.repository.update(id, { is_active: true });
  }
}
