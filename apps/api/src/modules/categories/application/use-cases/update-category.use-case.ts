import { Injectable } from '@nestjs/common';
import { ICategoriesRepository } from '../../domain/interfaces/categories.repository.interface';
import { UpdateCategoryCommand } from '../interfaces/category-commands.interface';
import { CategoryNotFoundError } from '../../domain/exceptions/category.exceptions';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(private readonly repository: ICategoriesRepository) {}

  async execute(id: number, command: UpdateCategoryCommand) {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new CategoryNotFoundError(id);
    }

    return this.repository.update(id, command);
  }
}
