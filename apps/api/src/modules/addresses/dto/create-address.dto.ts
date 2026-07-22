import { createZodDto } from 'nestjs-zod';
import { AddressSchema } from '@repo/types';

export class CreateAddressDto extends createZodDto(
  AddressSchema.omit({ id: true, is_active: true }),
) {}
