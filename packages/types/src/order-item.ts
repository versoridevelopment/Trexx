import { z } from 'zod';

export const OrderItemSchema = z.object({
  id: z.number(),
  order_id: z.any(),
  product_id: z.number().nullable().optional(),
  quantity: z.number().int().positive('Quantity must be positive'),
  price: z.number().positive('Price must be positive'),
  product_variant_id: z.number().nullable().optional(),
  is_active: z.boolean().default(true),
});

export type OrderItem = z.infer<typeof OrderItemSchema>;
