import { createZodDto } from 'nestjs-zod';
import { CategorySchema } from '@repo/types';

export class CreateCategoryDto extends createZodDto(
  CategorySchema.omit({ id: true, created_at: true }),
) {}
