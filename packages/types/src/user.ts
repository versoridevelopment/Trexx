import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email('Invalid email address'),
  name: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  createdAt: z.union([z.string(), z.date()]).nullable().optional(),
  is_active: z.boolean().default(true),
});

export type User = z.infer<typeof UserSchema>;
