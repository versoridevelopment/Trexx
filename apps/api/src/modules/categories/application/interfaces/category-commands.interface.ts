import { Category as ICategory } from '@repo/types';

export interface CreateCategoryCommand extends Omit<
  ICategory,
  'id' | 'created_at' | 'is_active'
> {
  // is_active is optional in command because it has a default,
  // but the interface says it's required. We can override it here for the command.
  is_active?: boolean;
}

export interface UpdateCategoryCommand extends Partial<CreateCategoryCommand> {}
