import { ProductsRepository } from './products.repository';
import { CreateProductDto, FilterProductDto, Product, UpdateProductDto } from './product.dto';
export declare class ProductsService {
    private productsRepository;
    constructor(productsRepository: ProductsRepository);
    getProducts(params?: FilterProductDto): Promise<{
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
    getProductById(id: number): Promise<Product>;
    createProduct(product: CreateProductDto): Promise<Product>;
    updateProduct(id: number, changes: UpdateProductDto): Promise<{
        id: number;
        name: string;
        description: string;
        price: number;
        stock: boolean;
        imgUrl: string;
    }>;
    deleteProduct(id: number): Promise<{
        id: number;
    }>;
}
