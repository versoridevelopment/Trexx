import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { IProductVariantsRepository } from './product-variants.repository.interface';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';

@Injectable()
export class ProductVariantsService {
  constructor(private readonly repository: IProductVariantsRepository) {}

  findByProduct(productId: number) {
    return this.repository.findByProduct(productId);
  }

  findByProductAdmin(productId: number) {
    return this.repository.findByProductAdmin(productId);
  }

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    const record = await this.repository.findOne(id);
    if (!record || !record.is_active) {
      throw new NotFoundException(`ProductVariant #${id} not found`);
    }
    return record;
  }

  async findOneAdmin(id: number) {
    const record = await this.repository.findOneAdmin(id);
    if (!record) throw new NotFoundException(`Variant #${id} not found`);
    return record;
  }

  create(dto: CreateProductVariantDto) {
    return this.repository.create(dto);
  }

  async update(id: number, dto: UpdateProductVariantDto) {
    await this.findOneAdmin(id);
    return this.repository.update(id, dto);
  }

  async remove(id: number) {
    await this.findOneAdmin(id);
    return this.repository.updateActiveStatus(id, false);
  }

  async restore(id: number) {
    const variant = await this.repository.findOneAdmin(id);
    if (!variant) throw new NotFoundException(`Variant #${id} not found`);
    if (variant.is_active) throw new BadRequestException(`Variant #${id} is already active`);
    return this.repository.updateActiveStatus(id, true);
  }
}
