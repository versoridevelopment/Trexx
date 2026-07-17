import { z } from 'zod';

export const CitySchema = z.object({
  id: z.number(),
  province_id: z.number(),
  name: z.string().min(1, 'Name is required'),
  is_active: z.boolean().default(true),
});

export type City = z.infer<typeof CitySchema>;
