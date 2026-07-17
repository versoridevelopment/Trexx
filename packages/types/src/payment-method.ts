import { z } from 'zod';

export const PaymentMethodSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
  is_active: z.boolean().default(true),
});

export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;
