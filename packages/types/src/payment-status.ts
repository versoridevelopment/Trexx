import { z } from 'zod';

export const PaymentStatusSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
  is_active: z.boolean().default(true),
});

export type PaymentStatus = z.infer<typeof PaymentStatusSchema>;
