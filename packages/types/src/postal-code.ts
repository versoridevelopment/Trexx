import { z } from 'zod';

export const PostalCodeSchema = z.object({
  id: z.number(),
  code: z.string().min(1, 'Code is required'),
  is_active: z.boolean().default(true),
});

export type PostalCode = z.infer<typeof PostalCodeSchema>;
