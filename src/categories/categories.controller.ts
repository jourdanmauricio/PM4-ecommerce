import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/models/roles.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CreateCategoryDto } from './categories.dto';
import { UUID } from 'crypto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoriesService.getAllCategories();
  }

  @ApiBearerAuth()
  @Get('seeder')
  addCategories() {
    return this.categoriesService.preLoadCategories();
  }

  @ApiBearerAuth()
  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  addCategory(@Body() category: CreateCategoryDto) {
    return this.categoriesService.createCategory(category);
  }

  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  updCategory(
    @Body() changes: CreateCategoryDto,
    @Param('id', ParseUUIDPipe) id: UUID,
  ) {
    return this.categoriesService.updateCategory(id, changes);
  }
}
