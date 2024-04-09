import { DataSource, Repository } from 'typeorm';
import { Orders } from '../entities/orders.entity';
import { CreateOrderDto } from './order.dto';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { OrderDetails } from '../entities/orderDetails.entity';
import { v4 as uuid } from 'uuid';
export declare class OrdersService {
    private ordersRepository;
    private orderDetailsRepository;
    private usersService;
    private productsService;
    private dataSource;
    constructor(ordersRepository: Repository<Orders>, orderDetailsRepository: Repository<OrderDetails>, usersService: UsersService, productsService: ProductsService, dataSource: DataSource);
    findAll(): Promise<Orders[]>;
    findOne(id: uuid): Promise<Orders>;
    create(order: CreateOrderDto): Promise<Orders>;
}
