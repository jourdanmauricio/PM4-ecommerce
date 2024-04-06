import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @Post()
  addCategorie(@Body() category: CreateCategoryDto) {
    return this.categoriesService.addCategorie(category);
  }

  @Post('seeder')
  addCategories() {
    return this.categoriesService.preLoadCategories();
  }
}
