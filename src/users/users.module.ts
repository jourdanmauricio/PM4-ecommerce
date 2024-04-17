import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './../entities/orders.entity';
import { Users } from '../entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Orders])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
