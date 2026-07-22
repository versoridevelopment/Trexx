import { Injectable } from '@nestjs/common';
import { ICategoriesRepository } from '../../domain/interfaces/categories.repository.interface';

@Injectable()
export class GetAllCategoriesUseCase {
  constructor(private readonly repository: ICategoriesRepository) {}

  execute(includeInactive = false) {
    return this.repository.findAll(includeInactive);
  }
}
