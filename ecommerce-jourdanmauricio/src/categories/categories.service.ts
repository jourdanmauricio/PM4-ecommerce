import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './categories.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './categories.dto';
import * as initialData from './../data/initialData.json';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getCategories() {
    return await this.categoriesRepository.find();
  }

  async addCategorie(data: CreateCategoryDto) {
    const newCategory = this.categoriesRepository.create(data);
    const result = await this.categoriesRepository
      .save(newCategory)
      .catch((err: any) => {
        throw new BadRequestException(err.detail);
      });
    return result;
  }

  async preLoadCategories() {
    const catCreated = [];
    const catFound = [];

    const unique_categories = new Set(
      initialData.map((product) => product.category),
    );

    for await (const category of unique_categories) {
      const found = await this.categoriesRepository.findOneBy({
        name: category,
      });
      if (!found) {
        const newCategory = await this.addCategorie({ name: category });
        catCreated.push({ id: newCategory.id, name: newCategory.name });
      } else {
        catFound.push({ id: found.id, name: found.name });
      }
    }
    return {
      message: 'Initial categories loaded successfully',
      total: unique_categories.size,
      data: {
        created: catCreated,
        found: catFound,
      },
    };
  }
}
