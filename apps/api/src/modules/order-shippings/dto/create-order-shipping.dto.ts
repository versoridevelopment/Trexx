import { createZodDto } from 'nestjs-zod';
import { OrderShippingSchema } from '@repo/types';

export class CreateOrderShippingDto extends createZodDto(
  OrderShippingSchema.omit({ id: true, is_active: true }),
) {}
