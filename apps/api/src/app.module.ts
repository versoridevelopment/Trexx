import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import configuration from './config/configuration';

import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { ProvincesModule } from './modules/provinces/provinces.module';
import { StorageModule } from './modules/storage/storage.module';

import { CitysModule } from './modules/cities/cities.module';
import { OrdersModule } from './modules/orders/orders.module';
import { OrderItemsModule } from './modules/order-items/order-items.module';
import { OrderShippingsModule } from './modules/order-shippings/order-shippings.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { PostalCodesModule } from './modules/postal-codes/postal-codes.module';
import { PaymentMethodsModule } from './modules/payment-methods/payment-methods.module';
import { PaymentStatusesModule } from './modules/payment-statuses/payment-statuses.module';
import { OrderStatusesModule } from './modules/order-statuses/order-statuses.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductVariantsModule } from './modules/product-variants/product-variants.module';
import { AttributeTypesModule } from './modules/attribute-types/attribute-types.module';
import { SettingsModule } from './modules/settings/settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../../.env', '.env'],
      load: [configuration],
    }),
    PrismaModule,
    UsersModule,
    ProductsModule,
    ProvincesModule,
    StorageModule,

    CitysModule,
    OrdersModule,
    OrderItemsModule,
    OrderShippingsModule,
    PaymentsModule,
    ReviewsModule,
    AddressesModule,
    PostalCodesModule,
    PaymentMethodsModule,
    PaymentStatusesModule,
    OrderStatusesModule,
    AuthModule,
    CategoriesModule,
    ProductVariantsModule,
    AttributeTypesModule,
    SettingsModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
