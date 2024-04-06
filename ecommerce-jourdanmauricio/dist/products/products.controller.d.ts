import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { v4 as uuid } from 'uuid';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getProducts(page?: string, limit?: string): Promise<{
        page: number;
        total: number;
        products: import("./products.entity").Product[];
    }>;
    getProductById(id: uuid): Promise<import("./products.entity").Product>;
    createProduct(product: CreateProductDto): Promise<import("./products.entity").Product>;
    updateProduct(id: uuid, payload: UpdateProductDto): Promise<import("./products.entity").Product>;
    deleteProduct(id: uuid): Promise<import("./products.entity").Product>;
    addCategories(): Promise<{
        message: string;
        total: number;
        data: {
            created: any[];
            found: any[];
            errors: any[];
        };
    }>;
}
