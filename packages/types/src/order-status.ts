import { z } from 'zod';

export const OrderStatusSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
  is_active: z.boolean().default(true),
});

export type OrderStatus = z.infer<typeof OrderStatusSchema>;
