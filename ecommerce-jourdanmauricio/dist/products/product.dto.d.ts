/// <reference types="node" />
import { UUID } from 'crypto';
export declare class CreateProductDto {
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly stock: number;
    readonly imgUrl?: string;
    readonly categoryId: UUID;
}
declare const UpdateProductDto_base: import("@nestjs/common").Type<Partial<CreateProductDto>>;
export declare class UpdateProductDto extends UpdateProductDto_base {
}
export {};
