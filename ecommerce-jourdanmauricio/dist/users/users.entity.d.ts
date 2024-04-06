import { Order } from 'src/orders/orders.entity';
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: number;
    country: string;
    address: string;
    city: string;
    createdAt: Date;
    updatedAt: Date;
    orders: Order[];
}
