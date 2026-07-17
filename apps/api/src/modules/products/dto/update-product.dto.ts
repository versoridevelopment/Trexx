import { createZodDto } from 'nestjs-zod';
import { ProductSchema } from '@repo/types';

export class UpdateProductDto extends createZodDto(
  ProductSchema.omit({ id: true, created_at: true, is_active: true }).partial()
) {}
