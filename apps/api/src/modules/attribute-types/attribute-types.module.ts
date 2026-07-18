import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { AttributeTypesService } from './attribute-types.service';
import { AttributeTypesController } from './attribute-types.controller';
import { IAttributeTypesRepository } from './attribute-types.repository.interface';
import { AttributeTypesRepository } from './attribute-types.repository';

@Module({
  imports: [PrismaModule],
  controllers: [AttributeTypesController],
  providers: [
    AttributeTypesService,
    { provide: IAttributeTypesRepository, useClass: AttributeTypesRepository },
  ],
  exports: [AttributeTypesService],
})
export class AttributeTypesModule {}
