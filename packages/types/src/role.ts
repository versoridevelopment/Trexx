import { z } from 'zod';

export const RoleSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
});

export const UserRoleSchema = z.object({
  user_id: z.string().uuid(),
  role_id: z.number(),
  assigned_at: z.union([z.string(), z.date()]).nullable().optional(),
});

export type Role = z.infer<typeof RoleSchema>;
export type UserRole = z.infer<typeof UserRoleSchema>;
