import { ApiTags } from '@nestjs/swagger';

import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @Get('seeder')
  addCategories() {
    return this.categoriesService.preLoadCategories();
  }
}
