/// <reference types="node" />
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './order.dto';
import { UUID } from 'crypto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    getOrders(): Promise<import("../entities/orders.entity").Orders[]>;
    getOrder(id: UUID): Promise<import("../entities/orders.entity").Orders>;
    addOrder(order: CreateOrderDto): Promise<import("../entities/orders.entity").Orders>;
}
