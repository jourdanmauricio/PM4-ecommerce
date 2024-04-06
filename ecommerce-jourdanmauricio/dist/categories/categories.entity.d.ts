import { Product } from 'src/products/products.entity';
export declare class Category {
    id: string;
    name: string;
    createAt: Date;
    updatedAt: Date;
    products: Product[];
}
