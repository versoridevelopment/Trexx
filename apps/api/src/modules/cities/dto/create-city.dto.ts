import { createZodDto } from 'nestjs-zod';
import { CitySchema } from '@repo/types';

export class CreateCityDto extends createZodDto(
  CitySchema.omit({ id: true, is_active: true }),
) {}
