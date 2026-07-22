import { createZodDto } from 'nestjs-zod';
import { PaymentSchema } from '@repo/types';

export class CreatePaymentDto extends createZodDto(
  PaymentSchema.omit({ id: true, created_at: true, is_active: true }),
) {}
