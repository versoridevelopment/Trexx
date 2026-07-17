import { createZodDto } from 'nestjs-zod';
import { OrderStatusSchema } from '@repo/types';

export class CreateOrderStatusDto extends createZodDto(
  OrderStatusSchema.omit({ id: true, is_active: true })
) {}
