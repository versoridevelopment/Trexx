import { z } from 'zod';

export const AttributeValueSchema = z.object({
  id: z.number(),
  attribute_type_id: z.number(),
  value: z.string().min(1, 'Value is required'),
  display_order: z.number().nullable().optional(),
  is_active: z.boolean().default(true),
});

export type AttributeValue = z.infer<typeof AttributeValueSchema>;
