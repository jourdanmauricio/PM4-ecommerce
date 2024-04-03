export declare class Product {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly stock: boolean;
    readonly imgUrl: string;
}
declare const CreateProductDto_base: import("@nestjs/mapped-types").MappedType<Omit<Product, "id">>;
export declare class CreateProductDto extends CreateProductDto_base {
}
declare const UpdateProductDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateProductDto>>;
export declare class UpdateProductDto extends UpdateProductDto_base {
}
export declare class FilterProductDto {
    limit: number;
    page: number;
}
export {};
