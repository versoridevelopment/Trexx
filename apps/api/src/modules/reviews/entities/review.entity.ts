import { ApiProperty } from '@nestjs/swagger';

export class ReviewUser {
  @ApiProperty({ example: '4539152d-031b-41c4-8ef8-c419e8b5f84a' })
  id: string;

  @ApiProperty({ example: 'Juan Pérez', nullable: true, type: () => String })
  name: string | null;
}

export class Review {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  product_id: number;

  @ApiProperty({ example: '4539152d-031b-41c4-8ef8-c419e8b5f84a' })
  user_id: string;

  @ApiProperty({ example: 5, minimum: 1, maximum: 5 })
  rating: number;

  @ApiProperty({
    example: 'Excelente producto',
    nullable: true,
    type: () => String,
  })
  comment: string | null;

  @ApiProperty({
    example: '2026-04-10T00:00:00.000Z',
    nullable: true,
    type: () => String,
  })
  created_at: Date | null;

  @ApiProperty({ example: true })
  is_active: boolean;

  @ApiProperty({ type: () => ReviewUser, nullable: true })
  users?: ReviewUser | null;
}
