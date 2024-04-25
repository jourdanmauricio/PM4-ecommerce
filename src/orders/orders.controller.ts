import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from './../guards/auth.guard';
// import { Public } from './../decorators/public.decorator';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './order.dto';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../models/roles.enum';
import { RolesGuard } from '../guards/roles.guard';
import { UUID } from 'crypto';

@ApiBearerAuth()
@ApiTags('Orders')
@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  getOrders() {
    return this.ordersService.findAll();
  }

  @Get('myOrders')
  myOrders(@Req() request) {
    const user = request.user;
    return this.ordersService.findOne(user.id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get(':id')
  getOrder(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.ordersService.findOne(id);
  }

  @Post()
  addOrder(@Body() orderProducts: CreateOrderDto, @Req() request) {
    const user = request.user;
    return this.ordersService.create(user.id, orderProducts);
  }
}
