import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';
import { OrderDetail } from './orderDetails.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetail]),
    UsersModule,
    ProductsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
