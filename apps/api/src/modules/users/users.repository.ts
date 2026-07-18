import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IUsersRepository } from './users.repository.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(includeInactive = false) {
    return this.prisma.users.findMany({
      where: includeInactive ? {} : { is_active: true },
    });
  }

  findByIdWithRoles(id: string) {
    return this.prisma.users.findUnique({
      where: { id } as any,
      include: {
        user_roles: { include: { roles: true } },
      } as any,
    });
  }

  findOne(id: string) {
    return this.prisma.users.findUnique({ where: { id } });
  }

  create(data: any) {
    return this.prisma.users.create({ data });
  }

  update(id: string, data: any) {
    return this.prisma.users.update({
      where: { id } as any,
      data,
      include: {
        user_roles: { include: { roles: true } },
      } as any,
    });
  }

  updateActiveStatus(id: string, isActive: boolean) {
    return this.prisma.users.update({
      where: { id },
      data: { is_active: isActive },
    });
  }

  findUserRole(userId: string, roleName: string) {
    return this.prisma.user_roles.findFirst({
      where: {
        user_id: userId,
        roles: { name: roleName },
      },
      include: { roles: true },
    });
  }
}
