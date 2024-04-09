import { Orders } from 'src/entities/orders.entity';
export declare class Users {
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
    orders: Orders[];
}
