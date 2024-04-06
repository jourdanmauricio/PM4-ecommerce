import { User } from 'src/users/users.entity';
import { OrderDetail } from './orderDetails.entity';
export declare class Order {
    id: string;
    date: Date;
    createAt: Date;
    updatedAt: Date;
    user: User;
    orderDetail: OrderDetail;
}
