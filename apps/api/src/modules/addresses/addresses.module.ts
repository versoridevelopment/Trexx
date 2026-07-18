import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { IAddressesRepository } from './addresses.repository.interface';
import { AddressesRepository } from './addresses.repository';

@Module({
  imports: [PrismaModule],
  controllers: [AddressesController],
  providers: [
    AddressesService,
    { provide: IAddressesRepository, useClass: AddressesRepository },
  ],
  exports: [AddressesService],
})
export class AddressesModule {}
