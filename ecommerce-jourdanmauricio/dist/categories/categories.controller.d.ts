import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    getCategories(): Promise<import("../entities/categories.entity").Categories[]>;
    addCategories(): Promise<{
        message: string;
    }>;
}
