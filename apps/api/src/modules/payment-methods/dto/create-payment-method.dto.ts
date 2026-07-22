import { createZodDto } from 'nestjs-zod';
import { PaymentMethodSchema } from '@repo/types';

export class CreatePaymentMethodDto extends createZodDto(
  PaymentMethodSchema.omit({ id: true, is_active: true }),
) {}
