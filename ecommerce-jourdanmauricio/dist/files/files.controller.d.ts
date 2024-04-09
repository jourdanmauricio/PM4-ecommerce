/// <reference types="multer" />
import { FilesService } from './files.service';
import { ProductsService } from 'src/products/products.service';
import { v4 as uuid } from 'uuid';
export declare class FilesController {
    private readonly filesService;
    private productsService;
    constructor(filesService: FilesService, productsService: ProductsService);
    uploadProductImage(id: uuid, file: Express.Multer.File): Promise<import("../entities/products.entity").Products>;
}
