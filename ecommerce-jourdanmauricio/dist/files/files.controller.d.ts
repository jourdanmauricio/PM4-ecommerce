/// <reference types="node" />
/// <reference types="multer" />
import { ProductsService } from './../products/products.service';
import { FilesService } from './files.service';
import { UUID } from 'crypto';
export declare class FilesController {
    private readonly filesService;
    private productsService;
    constructor(filesService: FilesService, productsService: ProductsService);
    uploadProductImage(id: UUID, file: Express.Multer.File): Promise<import("../entities/products.entity").Products>;
}
