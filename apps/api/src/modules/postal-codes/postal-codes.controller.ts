import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostalCodesService } from './postal-codes.service';
import { CreatePostalCodeDto } from './dto/create-postal-code.dto';
import { UpdatePostalCodeDto } from './dto/update-postal-code.dto';

/**
 * Controlador REST del módulo "postal-codes".
 * Administra los códigos postales usados en direcciones de envío.
 * Ruta base: /postal_codes
 * Nota: a diferencia de otros módulos, este controlador no aplica guards de
 * autenticación en ninguno de sus endpoints (todos son públicos).
 */
@Controller('postal_codes')
export class PostalCodesController {
  constructor(private readonly service: PostalCodesService) {}

  /**
   * Crea un nuevo código postal.
   * @route POST /postal_codes
   * @auth Público.
   * @param dto Datos del código postal (CreatePostalCodeDto).
   * @returns El código postal creado.
   */
  @Post()
  create(@Body() dto: CreatePostalCodeDto) {
    return this.service.create(dto);
  }

  /**
   * Lista todos los códigos postales.
   * @route GET /postal_codes
   * @auth Público.
   * @returns Arreglo de códigos postales.
   */
  @Get()
  findAll() {
    return this.service.findAll();
  }

  /**
   * Obtiene un código postal por su ID.
   * @route GET /postal_codes/:id
   * @auth Público.
   * @param id ID numérico del código postal.
   * @returns El código postal encontrado.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  /**
   * Actualiza parcialmente un código postal.
   * @route PATCH /postal_codes/:id
   * @auth Público.
   * @param id ID numérico del código postal.
   * @param dto Campos a modificar (UpdatePostalCodeDto).
   * @returns El código postal actualizado.
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePostalCodeDto) {
    return this.service.update(Number(id), dto);
  }

  /**
   * Elimina un código postal.
   * @route DELETE /postal_codes/:id
   * @auth Público.
   * @param id ID numérico del código postal a eliminar.
   * @returns Resultado de la operación de borrado.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
