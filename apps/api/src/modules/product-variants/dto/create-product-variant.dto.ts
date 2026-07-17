import { createZodDto } from 'nestjs-zod';
import { ProductVariantSchema } from '@repo/types';

export class CreateProductVariantDto extends createZodDto(
  ProductVariantSchema.omit({ id: true, created_at: true, attributes: true })
) {}
