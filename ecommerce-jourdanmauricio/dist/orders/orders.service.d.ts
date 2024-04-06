import { DataSource, Repository } from 'typeorm';
import { Order } from './orders.entity';
import { CreateOrderDto } from './order.dto';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { OrderDetail } from './orderDetails.entity';
import { v4 as uuid } from 'uuid';
export declare class OrdersService {
    private ordersRepository;
    private orderDetailsRepository;
    private usersService;
    private productsService;
    private dataSource;
    constructor(ordersRepository: Repository<Order>, orderDetailsRepository: Repository<OrderDetail>, usersService: UsersService, productsService: ProductsService, dataSource: DataSource);
    findAll(): Promise<Order[]>;
    findOne(id: uuid): Promise<Order>;
    create(order: CreateOrderDto): Promise<OrderDetail>;
}
