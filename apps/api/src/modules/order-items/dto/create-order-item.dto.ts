import { createZodDto } from 'nestjs-zod';
import { OrderItemSchema } from '@repo/types';

export class CreateOrderItemDto extends createZodDto(
  OrderItemSchema.omit({ id: true, is_active: true }),
) {}
