import { v4 as uuid } from 'uuid';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { Repository } from 'typeorm';
import { Product } from './products.entity';
import { Category } from 'src/categories/categories.entity';
export declare class ProductsService {
    private productsRepository;
    private categoriesRepository;
    constructor(productsRepository: Repository<Product>, categoriesRepository: Repository<Category>);
    findAll(page: number, limit: number): Promise<{
        page: number;
        total: number;
        products: Product[];
    }>;
    findOne(id: uuid): Promise<Product>;
    create(product: CreateProductDto): Promise<Product>;
    update(id: uuid, changes: UpdateProductDto): Promise<Product>;
    remove(id: uuid): Promise<Product>;
    preLoadProducts(): Promise<{
        message: string;
        total: number;
        data: {
            created: any[];
            found: any[];
            errors: any[];
        };
    }>;
}
