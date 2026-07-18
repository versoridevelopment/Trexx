import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ProvincesService } from './provinces.service';
import { ProvincesController } from './provinces.controller';
import { IProvincesRepository } from './provinces.repository.interface';
import { ProvincesRepository } from './provinces.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ProvincesController],
  providers: [
    ProvincesService,
    { provide: IProvincesRepository, useClass: ProvincesRepository },
  ],
  exports: [ProvincesService],
})
export class ProvincesModule {}
