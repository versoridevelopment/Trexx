import { z } from 'zod';

export const ProductImageSchema = z.object({
  id: z.number(),
  product_id: z.number(),
  url: z.string(),
  is_primary: z.boolean().default(false),
  created_at: z.union([z.string(), z.date()]).nullable().optional(),
});

export type ProductImage = z.infer<typeof ProductImageSchema>;

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
  price: z.number().positive('Price must be positive'),
  description: z.string().nullable().optional(),
  category_id: z.number(),
  created_at: z.union([z.string(), z.date()]).nullable().optional(),
  is_active: z.boolean().default(true),
  product_images: z.array(ProductImageSchema).default([]),
});

export type Product = z.infer<typeof ProductSchema>;
