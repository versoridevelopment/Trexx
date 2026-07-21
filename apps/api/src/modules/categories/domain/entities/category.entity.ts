import { Category as ICategory } from '@repo/types';
import { ApiProperty } from '@nestjs/swagger';

export class Category implements ICategory {
  @ApiProperty({ example: 1 })
  public readonly id: number;

  @ApiProperty({ example: 'Remeras' })
  public readonly name: string;

  @ApiProperty({ example: 'remeras' })
  public readonly slug: string;

  @ApiProperty({ example: 'Descripción', nullable: true, type: () => String })
  public readonly description: string | null;

  @ApiProperty({ example: true })
  public readonly is_active: boolean;

  @ApiProperty({ example: '2026-04-10T00:00:00.000Z', nullable: true, type: () => String })
  public readonly created_at: Date | null;

  constructor(
    id: number,
    name: string,
    slug: string,
    description: string | null,
    is_active: boolean,
    created_at: Date | null
  ) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.description = description;
    this.is_active = is_active;
    this.created_at = created_at;
  }

  static create(id: number, name: string, slug: string, description: string | null, is_active: boolean, created_at: Date | null): Category {
    return new Category(id, name, slug, description, is_active, created_at);
  }
}
