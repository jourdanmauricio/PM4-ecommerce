import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from './../guards/auth.guard';
// import { Public } from './../decorators/public.decorator';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './order.dto';
import { UUID } from 'crypto';

@ApiBearerAuth()
@ApiTags('Orders')
@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  // Solo admin?
  // @Public()
  getOrders() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  getOrder(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.ordersService.findOne(id);
  }

  @Post()
  addOrder(@Body() order: CreateOrderDto) {
    return this.ordersService.create(order);
  }
}
