import { Products } from 'src/entities/products.entity';
export declare class Categories {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    products: Products[];
}
