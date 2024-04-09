import { Orders } from './orders.entity';
import { Products } from 'src/entities/products.entity';
export declare class OrderDetails {
    id: string;
    price: number;
    order: Orders;
    products: Products[];
}
