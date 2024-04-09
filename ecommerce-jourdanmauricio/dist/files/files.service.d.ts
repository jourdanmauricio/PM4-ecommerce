/// <reference types="multer" />
import { UploadApiResponse } from 'cloudinary';
export declare class FilesService {
    uploadImage(file: Express.Multer.File): Promise<UploadApiResponse>;
}
