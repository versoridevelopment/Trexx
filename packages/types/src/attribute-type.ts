import { z } from 'zod';

export const AttributeTypeSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  applies_to: z.string().default('all'),
  created_at: z.union([z.string(), z.date()]).nullable().optional(),
  is_active: z.boolean().default(true),
});

export type AttributeType = z.infer<typeof AttributeTypeSchema>;
