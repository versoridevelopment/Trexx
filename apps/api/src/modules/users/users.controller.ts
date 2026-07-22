import {
  Controller,
  Get,
  Patch,
  Body,
  UseGuards,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiResponse } from '@nestjs/swagger';

/**
 * Controlador REST del módulo "users".
 * Administra el perfil del usuario autenticado y operaciones administrativas
 * sobre la tabla de usuarios.
 * Ruta base: /users
 * Nota: todo el controlador requiere JWT de Supabase (@UseGuards a nivel de clase).
 */
@ApiTags('users')
@ApiBearerAuth()
@UseGuards(SupabaseAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Devuelve el perfil del usuario autenticado.
   * @route GET /users/me
   * @auth Requiere JWT de Supabase.
   * @param user Usuario autenticado inyectado por @CurrentUser(); se usa user.sub como ID.
   * @returns El User correspondiente al usuario autenticado (200).
   */
  @Get('me')
  @ApiResponse({ status: 200, type: User })
  getMe(@CurrentUser() user: any) {
    return this.usersService.findById(user.id || user.sub);
  }

  /**
   * Actualiza el perfil del usuario autenticado.
   * @route PATCH /users/me
   * @auth Requiere JWT de Supabase.
   * @param user Usuario autenticado inyectado por @CurrentUser().
   * @param dto Campos a modificar (UpdateUserDto).
   * @returns El User actualizado (200).
   */
  @Patch('me')
  @ApiResponse({ status: 200, type: User })
  updateMe(@CurrentUser() user: any, @Body() dto: UpdateUserDto) {
    return this.usersService.update(user.id || user.sub, dto);
  }

  /**
   * Lista todos los usuarios para administración, incluyendo opcionalmente
   * los inactivos.
   * @route GET /users/admin/all?includeInactive=true|false
   * @auth Requiere JWT de Supabase + rol "admin".
   * @param includeInactive Query param string ('true'/'false') para incluir inactivos.
   * @returns Arreglo de usuarios.
   */
  @Get('admin/all')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiQuery({ name: 'includeInactive', required: false })
  findAllAdmin(@Query('includeInactive') includeInactive?: string) {
    return this.usersService.findAll(includeInactive === 'true');
  }

  /**
   * Elimina (soft delete) un usuario por su ID.
   * @route DELETE /users/:id
   * @auth Requiere JWT de Supabase + rol "admin".
   * @param id ID del usuario a eliminar.
   * @returns Resultado de la operación de borrado.
   */
  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  /**
   * Restaura un usuario previamente eliminado (soft delete).
   * @route PATCH /users/:id/restore
   * @auth Requiere JWT de Supabase + rol "admin".
   * @param id ID del usuario a restaurar.
   * @returns El usuario restaurado.
   */
  @Patch(':id/restore')
  @UseGuards(RolesGuard)
  @Roles('admin')
  restore(@Param('id') id: string) {
    return this.usersService.restore(id);
  }
}
