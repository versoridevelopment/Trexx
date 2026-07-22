import { createZodDto } from 'nestjs-zod';
import { AttributeTypeSchema } from '@repo/types';

export class CreateAttributeTypeDto extends createZodDto(
  AttributeTypeSchema.omit({ id: true, created_at: true, is_active: true }),
) {}
