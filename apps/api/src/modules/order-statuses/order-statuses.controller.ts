import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { Controller, UseGuards, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderStatusesService } from './order-statuses.service';
import { CreateOrderStatusDto } from './dto/create-order-status.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@ApiTags('order-statuses')
@Controller('order_statuses')
export class OrderStatusesController {
  constructor(private readonly service: OrderStatusesService) {}

  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() dto: CreateOrderStatusDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto) {
    return this.service.update(Number(id), dto);
  }

  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
