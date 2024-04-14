import { v4 as uuid } from 'uuid';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { Repository } from 'typeorm';
import { Products } from '../entities/products.entity';
import { Categories } from './../entities/categories.entity';
export declare class ProductsService {
    private productsRepository;
    private categoriesRepository;
    constructor(productsRepository: Repository<Products>, categoriesRepository: Repository<Categories>);
    findAll(page: number, limit: number): Promise<{
        page: number;
        total: number;
        products: Products[];
    }>;
    findOne(id: uuid): Promise<Products>;
    create(product: CreateProductDto): Promise<Products>;
    update(id: uuid, changes: UpdateProductDto): Promise<Products>;
    remove(id: uuid): Promise<Products>;
    preLoadProducts(): Promise<{
        message: string;
    }>;
}
