import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from '../entities/orders.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';
import { OrderDetails } from '../entities/orderDetails.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders, OrderDetails]),
    UsersModule,
    ProductsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
