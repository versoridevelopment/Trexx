import { createZodDto } from 'nestjs-zod';
import { UserSchema } from '@repo/types';

export class CreateUserDto extends createZodDto(
  UserSchema.omit({ id: true, createdAt: true, is_active: true }),
) {}
