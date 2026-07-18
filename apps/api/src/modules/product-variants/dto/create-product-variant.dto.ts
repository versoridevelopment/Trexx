import { createZodDto } from 'nestjs-zod';
import { ProductVariantSchema } from '@repo/types';
import { z } from 'zod';

const schema = ProductVariantSchema.omit({ id: true, created_at: true, attributes: true }).extend({
  attribute_value_ids: z.array(z.number()).optional(),
});

export class CreateProductVariantDto extends createZodDto(schema) {}

