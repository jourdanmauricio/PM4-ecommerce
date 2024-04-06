import { v4 as uuid } from 'uuid';
export declare class CreateProductDto {
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly stock: number;
    readonly imgUrl?: string;
    readonly categoryId: uuid;
}
declare const UpdateProductDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateProductDto>>;
export declare class UpdateProductDto extends UpdateProductDto_base {
}
export declare class FilterProductDto {
    limit: number;
    page: number;
}
export {};
