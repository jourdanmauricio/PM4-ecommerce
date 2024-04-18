import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from '../entities/categories.entity';
import { Repository } from 'typeorm';
import * as initialData from './../data/initialData.json';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getAllCategories() {
    return await this.categoriesRepository.find();
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
