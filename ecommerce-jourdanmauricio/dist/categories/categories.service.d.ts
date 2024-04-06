import { Category } from './categories.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './categories.dto';
export declare class CategoriesService {
    private categoriesRepository;
    constructor(categoriesRepository: Repository<Category>);
    getCategories(): Promise<Category[]>;
    addCategorie(data: CreateCategoryDto): Promise<Category>;
    preLoadCategories(): Promise<{
        message: string;
        total: number;
        data: {
            created: any[];
            found: any[];
        };
    }>;
}
