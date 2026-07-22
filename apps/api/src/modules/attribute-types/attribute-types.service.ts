import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { IAttributeTypesRepository } from './attribute-types.repository.interface';
import { CreateAttributeTypeDto } from './dto/create-attribute-type.dto';
import { UpdateAttributeTypeDto } from './dto/update-attribute-type.dto';

@Injectable()
export class AttributeTypesService {
  constructor(private readonly repository: IAttributeTypesRepository) {}

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    const record = await this.repository.findOne(id);
    if (!record || !record.is_active) {
      throw new NotFoundException(`AttributeType #${id} not found`);
    }
    return record;
  }

  findAllAdmin(includeInactive = false) {
    return this.repository.findAllAdmin(includeInactive);
  }

  async findOneAdmin(id: number) {
    const record = await this.repository.findOneAdmin(id);
    if (!record) throw new NotFoundException(`AttributeType #${id} not found`);
    return record;
  }

  create(dto: CreateAttributeTypeDto) {
    return this.repository.create(dto);
  }

  async update(id: number, dto: UpdateAttributeTypeDto) {
    await this.findOneAdmin(id);
    return this.repository.update(id, dto);
  }

  async remove(id: number) {
    await this.findOneAdmin(id);
    return this.repository.updateActiveStatus(id, false);
  }

  async restore(id: number) {
    const record = await this.repository.findOneAdmin(id);
    if (!record) throw new NotFoundException(`AttributeType #${id} not found`);
    if (record.is_active)
      throw new BadRequestException(`AttributeType #${id} is already active`);
    return this.repository.updateActiveStatus(id, true);
  }
}
