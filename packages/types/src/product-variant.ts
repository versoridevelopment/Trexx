import { z } from 'zod';
import { AttributeValueSchema } from './attribute-value.js';

export const ProductVariantSchema = z.object({
  id: z.number(),
  product_id: z.number(),
  sku: z.string().nullable().optional(),
  price_modifier: z.number().nullable().optional(),
  stock: z.number().int().nonnegative('Stock cannot be negative'),
  is_active: z.boolean().nullable().optional(),
  created_at: z.union([z.string(), z.date()]).nullable().optional(),
  attributes: z.array(AttributeValueSchema).optional(),
});

export const VariantAttributeSchema = z.object({
  variant_id: z.number(),
  attribute_value_id: z.number(),
});

export type ProductVariant = z.infer<typeof ProductVariantSchema>;
export type VariantAttribute = z.infer<typeof VariantAttributeSchema>;
