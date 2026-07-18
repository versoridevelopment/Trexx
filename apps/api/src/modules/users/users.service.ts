import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { IUsersRepository } from './users.repository.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly repository: IUsersRepository) {}

  findAll(includeInactive = false) {
    return this.repository.findAll(includeInactive);
  }

  async findById(id: string) {
    const record = await this.repository.findByIdWithRoles(id);
    if (!record || !record.is_active) throw new NotFoundException(`User #${id} not found`);
    return record;
  }

  async findOne(id: string) {
    const user = await this.repository.findOne(id);
    if (!user || !user.is_active) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  // Find including inactive (for admin/auth)
  async findOneAdmin(id: string) {
    const user = await this.repository.findOne(id);
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  create(dto: CreateUserDto) {
    return this.repository.create(dto);
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findOneAdmin(id);
    return this.repository.update(id, dto);
  }

  // Soft delete
  async remove(id: string) {
    await this.findOneAdmin(id);
    return this.repository.updateActiveStatus(id, false);
  }

  // Reactivar
  async restore(id: string) {
    const record = await this.repository.findOne(id);
    if (!record) throw new NotFoundException(`User #${id} not found`);
    if (record.is_active) throw new BadRequestException(`User #${id} is already active`);
    return this.repository.updateActiveStatus(id, true);
  }

  // Verificar si un usuario tiene un rol específico
  async hasRole(userId: string, roleName: string): Promise<boolean> {
    const userRole = await this.repository.findUserRole(userId, roleName);
    return !!userRole;
  }
}
