import { ProductsService } from './products.service';
import { CreateProductDto, FilterProductDto, UpdateProductDto } from './product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getProducts(params: FilterProductDto): Promise<{
        page: number;
        products: {
            id: number;
            name: string;
            description: string;
            price: number;
            stock: boolean;
            imgUrl: string;
        }[];
    }>;
    getProductById(id: string): Promise<import("./product.dto").Product>;
    createProduct(product: CreateProductDto): Promise<import("./product.dto").Product>;
    updateProduct(id: string, payload: UpdateProductDto): Promise<{
        id: number;
        name: string;
        description: string;
        price: number;
        stock: boolean;
        imgUrl: string;
    }>;
    deleteProduct(id: string): Promise<{
        id: number;
    }>;
}
