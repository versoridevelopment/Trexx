import { ApiProperty } from '@nestjs/swagger';
import { User as UserInterface } from '@repo/types';

export class RoleEntity {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'admin' })
  name: string;
}

export class UserRoleEntity {
  @ApiProperty({ type: () => RoleEntity })
  roles: RoleEntity;
}

export class User implements UserInterface {
  @ApiProperty({ example: 'cbbc6dcc-79e7-409f-9a66-2ee871e52e3f' })
  id: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({
    example: 'John Doe',
    required: false,
    nullable: true,
    type: () => String,
  })
  name: string | null;

  @ApiProperty({
    example: '+123456789',
    required: false,
    nullable: true,
    type: () => String,
  })
  phone: string | null;

  @ApiProperty({
    example: '2026-04-10T05:27:56.077Z',
    required: false,
    nullable: true,
    type: () => String,
  })
  createdAt: Date | null;

  @ApiProperty({ example: true })
  is_active: boolean;

  @ApiProperty({ type: () => [UserRoleEntity], required: false })
  user_roles?: UserRoleEntity[];
}
