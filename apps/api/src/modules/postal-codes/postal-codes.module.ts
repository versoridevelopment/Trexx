import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { PostalCodesService } from './postal-codes.service';
import { PostalCodesController } from './postal-codes.controller';
import { IPostalCodesRepository } from './postal-codes.repository.interface';
import { PostalCodesRepository } from './postal-codes.repository';

@Module({
  imports: [PrismaModule],
  controllers: [PostalCodesController],
  providers: [
    PostalCodesService,
    { provide: IPostalCodesRepository, useClass: PostalCodesRepository },
  ],
  exports: [PostalCodesService],
})
export class PostalCodesModule {}
