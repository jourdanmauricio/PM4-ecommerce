import { Categories } from 'src/entities/categories.entity';
import { OrderDetails } from 'src/entities/orderDetails.entity';
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
