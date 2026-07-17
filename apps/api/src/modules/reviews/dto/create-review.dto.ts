import { createZodDto } from 'nestjs-zod';
import { ReviewSchema } from '@repo/types';

export class CreateReviewDto extends createZodDto(
  ReviewSchema.omit({ id: true, user_id: true, created_at: true, is_active: true })
) {}
