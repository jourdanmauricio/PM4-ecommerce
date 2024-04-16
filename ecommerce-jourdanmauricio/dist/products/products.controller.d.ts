/// <reference types="node" />
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { UUID } from 'crypto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getProducts(page: number, limit: number): Promise<{
        page: number;
        total: number;
        products: import("../entities/products.entity").Products[];
    }>;
    addProducts(): Promise<{
        message: string;
    }>;
    getProductById(id: UUID): Promise<import("../entities/products.entity").Products>;
    createProduct(product: CreateProductDto): Promise<import("../entities/products.entity").Products>;
    updateProduct(id: UUID, payload: UpdateProductDto): Promise<import("../entities/products.entity").Products>;
    deleteProduct(id: UUID): Promise<import("../entities/products.entity").Products>;
}
