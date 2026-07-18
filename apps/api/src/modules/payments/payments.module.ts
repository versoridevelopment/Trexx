import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { IPaymentsRepository } from './payments.repository.interface';
import { PaymentsRepository } from './payments.repository';

@Module({
  imports: [PrismaModule],
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    { provide: IPaymentsRepository, useClass: PaymentsRepository },
  ],
  exports: [PaymentsService],
})
export class PaymentsModule {}
