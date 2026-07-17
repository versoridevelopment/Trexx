import { createZodDto } from 'nestjs-zod';
import { OrderSchema } from '@repo/types';

export class CreateOrderDto extends createZodDto(
  OrderSchema.omit({ id: true, created_at: true, is_active: true })
) {}
