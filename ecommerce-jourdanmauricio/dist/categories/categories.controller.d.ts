import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './categories.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    getCategories(): Promise<import("./categories.entity").Category[]>;
    addCategorie(category: CreateCategoryDto): Promise<import("./categories.entity").Category>;
    addCategories(): Promise<{
        message: string;
        total: number;
        data: {
            created: any[];
            found: any[];
        };
    }>;
}
