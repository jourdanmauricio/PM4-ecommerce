import { Category } from 'src/categories/categories.entity';
import { OrderDetail } from 'src/orders/orderDetails.entity';
export declare class Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imgUrl?: string;
    createdAt: Date;
    updatedAt: Date;
    category: Category;
    orderDetails: OrderDetail[];
}
