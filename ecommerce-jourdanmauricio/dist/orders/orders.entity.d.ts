import { User } from 'src/users/users.entity';
import { OrderDetail } from './orderDetails.entity';
export declare class Order {
    id: string;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    orderDetail: OrderDetail;
}
