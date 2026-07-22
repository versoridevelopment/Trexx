import { createZodDto } from 'nestjs-zod';
import { PostalCodeSchema } from '@repo/types';

export class CreatePostalCodeDto extends createZodDto(
  PostalCodeSchema.omit({ id: true, is_active: true }),
) {}
