import { OrdersService } from './orders.service';
import { CreateOrderDto } from './order.dto';
import { v4 as uuid } from 'uuid';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    getOrders(): Promise<import("../entities/orders.entity").Orders[]>;
    getOrder(id: uuid): Promise<import("../entities/orders.entity").Orders>;
    addOrder(order: CreateOrderDto): Promise<import("../entities/orders.entity").Orders>;
}
