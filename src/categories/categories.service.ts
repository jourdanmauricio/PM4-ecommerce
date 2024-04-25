import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from '../entities/categories.entity';
import { Repository } from 'typeorm';
import * as initialData from './../data/initialData.json';
import { CreateCategoryDto } from './categories.dto';
import { UUID } from 'crypto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getAllCategories() {
    return await this.categoriesRepository.find();
  }

  async createCategory(category: CreateCategoryDto) {
    const found = await this.categoriesRepository.findOneBy({
      name: category.name,
    });

    if (found) throw new BadRequestException('La categoría ya existe');

    const newCategory = this.categoriesRepository.create(category);
    const result = this.categoriesRepository.save(newCategory);
    return result;
  }

  async updateCategory(id: UUID, changes: CreateCategoryDto) {
    const category = await this.categoriesRepository.findOneBy({ id });

    if (!category) throw new BadRequestException('Category not found');

    const updCategory = this.categoriesRepository.merge(category, changes);
    return await this.categoriesRepository.save(updCategory);
  }

  async preLoadCategories() {
    const arrPromises = initialData.map(async (el) => {
      await this.categoriesRepository
        .createQueryBuilder()
        .insert()
        .into(Categories)
        .values({ name: el.category })
        .orIgnore(`("name") DO NOTHING`)
        .execute();
    });

    await Promise.all(arrPromises);

    return { message: 'Categories added' };
  }
}
