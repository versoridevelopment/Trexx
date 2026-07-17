import { z } from 'zod';

export const PaymentSchema = z.object({
  id: z.number(),
  order_id: z.any(),
  method_id: z.number(),
  status_id: z.number(),
  external_id: z.string().nullable().optional(),
  amount: z.number().positive('Amount must be positive'),
  created_at: z.union([z.string(), z.date()]).nullable().optional(),
  is_active: z.boolean().default(true),
});

export type Payment = z.infer<typeof PaymentSchema>;
