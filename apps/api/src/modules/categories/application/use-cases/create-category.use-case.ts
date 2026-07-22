import { Injectable } from '@nestjs/common';
import { ICategoriesRepository } from '../../domain/interfaces/categories.repository.interface';
import { CreateCategoryCommand } from '../interfaces/category-commands.interface';
import { CategoryAlreadyExistsError } from '../../domain/exceptions/category.exceptions';

@Injectable()
export class CreateCategoryUseCase {
  constructor(private readonly repository: ICategoriesRepository) {}

  async execute(command: CreateCategoryCommand) {
    const existing = await this.repository.findBySlug(command.slug);
    if (existing) {
      throw new CategoryAlreadyExistsError(command.slug);
    }

    // Command is already pure TS, we can pass it to repository (which uses Partial<Category>)
    return this.repository.save(command);
  }
}
