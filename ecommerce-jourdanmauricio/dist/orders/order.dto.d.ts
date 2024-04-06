import { v4 as uuid } from 'uuid';
export declare class CreateOrderDto {
    userId: uuid;
    products: {
        id: uuid;
    }[];
}
