import { Product } from 'src/products/products.entity';
export declare class Category {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    products: Product[];
}
