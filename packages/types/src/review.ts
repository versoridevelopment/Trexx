import { z } from 'zod';

export const ReviewSchema = z.object({
  id: z.number(),
  product_id: z.number(),
  user_id: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().nullable().optional(),
  created_at: z.union([z.string(), z.date()]).nullable().optional(),
  is_active: z.boolean().default(true),
});

export type Review = z.infer<typeof ReviewSchema>;
