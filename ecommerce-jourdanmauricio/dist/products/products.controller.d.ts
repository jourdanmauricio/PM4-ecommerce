import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { v4 as uuid } from 'uuid';
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
    getProductById(id: uuid): Promise<import("../entities/products.entity").Products>;
    createProduct(product: CreateProductDto): Promise<import("../entities/products.entity").Products>;
    updateProduct(id: uuid, payload: UpdateProductDto): Promise<import("../entities/products.entity").Products>;
    deleteProduct(id: uuid): Promise<import("../entities/products.entity").Products>;
}
