import { Users } from './users.entity';
import { OrderDetails } from './orderDetails.entity';
export declare class Orders {
    id: string;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
    user: Users;
    orderDetail: OrderDetails;
}
