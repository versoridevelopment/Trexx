import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { PaymentStatussService } from './payment-statuses.service';
import { PaymentStatussController } from './payment-statuses.controller';
import { IPaymentStatusesRepository } from './payment-statuses.repository.interface';
import { PaymentStatusesRepository } from './payment-statuses.repository';

@Module({
  imports: [PrismaModule],
  controllers: [PaymentStatussController],
  providers: [
    PaymentStatussService,
    {
      provide: IPaymentStatusesRepository,
      useClass: PaymentStatusesRepository,
    },
  ],
  exports: [PaymentStatussService],
})
export class PaymentStatusesModule {}
