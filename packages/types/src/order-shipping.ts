import { z } from 'zod';

export const OrderShippingSchema = z.object({
  id: z.number(),
  order_id: z.any(),
  recipient_name: z.string().min(1, 'Recipient name is required'),
  address_id: z.number(),
  notes: z.string().nullable().optional(),
  is_active: z.boolean().default(true),
});

export type OrderShipping = z.infer<typeof OrderShippingSchema>;
