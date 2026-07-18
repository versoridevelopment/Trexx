import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { PaymentMethodsService } from './payment-methods.service';
import { PaymentMethodsController } from './payment-methods.controller';
import { IPaymentMethodsRepository } from './payment-methods.repository.interface';
import { PaymentMethodsRepository } from './payment-methods.repository';

@Module({
  imports: [PrismaModule],
  controllers: [PaymentMethodsController],
  providers: [
    PaymentMethodsService,
    { provide: IPaymentMethodsRepository, useClass: PaymentMethodsRepository },
  ],
  exports: [PaymentMethodsService],
})
export class PaymentMethodsModule {}
