import { OrdersService } from './orders.service';
import { CreateOrderDto } from './order.dto';
import { v4 as uuid } from 'uuid';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    getOrders(): Promise<import("./orders.entity").Order[]>;
    getOrder(id: uuid): Promise<import("./orders.entity").Order>;
    addOrder(order: CreateOrderDto): Promise<import("./orderDetails.entity").OrderDetail>;
}
