import { createZodDto } from 'nestjs-zod';
import { PaymentStatusSchema } from '@repo/types';

export class CreatePaymentStatusDto extends createZodDto(
  PaymentStatusSchema.omit({ id: true, is_active: true }),
) {}
