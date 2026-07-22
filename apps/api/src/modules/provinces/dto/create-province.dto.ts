import { createZodDto } from 'nestjs-zod';
import { ProvinceSchema } from '@repo/types';

export class CreateProvinceDto extends createZodDto(
  ProvinceSchema.omit({ id: true, is_active: true }),
) {}
