import { z } from 'zod';

export const AddressSchema = z.object({
  id: z.number(),
  user_id: z.string().uuid(),
  address_line: z.string().min(1, 'Address line is required'),
  city_id: z.number(),
  postal_code_id: z.number(),
  is_default: z.boolean().nullable().optional(),
  is_active: z.boolean().default(true),
});

export type Address = z.infer<typeof AddressSchema>;
