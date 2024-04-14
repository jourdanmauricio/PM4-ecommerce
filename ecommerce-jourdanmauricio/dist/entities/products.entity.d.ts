import { Categories } from './categories.entity';
import { OrderDetails } from './orderDetails.entity';
export declare class Products {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imgUrl?: string;
    createdAt: Date;
    updatedAt: Date;
    category: Categories;
    orderDetails: OrderDetails[];
}
