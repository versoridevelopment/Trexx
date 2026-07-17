import { z } from 'zod';

export const OrderSchema = z.object({
  id: z.any(),
  user_id: z.string().uuid().nullable().optional(),
  total: z.number().positive('Total must be positive'),
  created_at: z.union([z.string(), z.date()]).nullable().optional(),
  status_id: z.number(),
  is_active: z.boolean().default(true),
});

export type Order = z.infer<typeof OrderSchema>;
