import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { CitysService } from './cities.service';
import { CitysController } from './cities.controller';
import { ICitysRepository } from './cities.repository.interface';
import { CitysRepository } from './cities.repository';

@Module({
  imports: [PrismaModule],
  controllers: [CitysController],
  providers: [
    CitysService,
    { provide: ICitysRepository, useClass: CitysRepository },
  ],
  exports: [CitysService],
})
export class CitysModule {}
