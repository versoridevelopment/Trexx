import { createZodDto } from 'nestjs-zod';
import { UserSchema } from '@repo/types';

export class UpdateUserDto extends createZodDto(
  UserSchema.pick({ name: true, phone: true }).partial(),
) {}
