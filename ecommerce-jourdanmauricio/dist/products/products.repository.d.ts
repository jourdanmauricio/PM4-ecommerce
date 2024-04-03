import { CreateProductDto, FilterProductDto, UpdateProductDto } from './product.dto';
export declare class ProductsRepository {
    private products;
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
    getById(id: number): Promise<{
        id: number;
        name: string;
        description: string;
        price: number;
        stock: boolean;
        imgUrl: string;
    }>;
    createProduct(product: CreateProductDto): Promise<{
        name: string;
        description: string;
        price: number;
        stock: boolean;
        imgUrl: string;
        id: number;
    }>;
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
