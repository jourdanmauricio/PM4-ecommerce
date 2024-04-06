import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './order.dto';
import { v4 as uuid } from 'uuid';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getOrders() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  getOrder(@Param('id', ParseUUIDPipe) id: uuid) {
    return this.ordersService.findOne(id);
  }

  @Post()
  addOrder(@Body() order: CreateOrderDto) {
    return this.ordersService.create(order);
    //
  }
}
