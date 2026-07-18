import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { IUsersRepository } from './users.repository.interface';
import { UsersRepository } from './users.repository';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: IUsersRepository, useClass: UsersRepository },
  ],
  exports: [UsersService],
})
export class UsersModule {}
