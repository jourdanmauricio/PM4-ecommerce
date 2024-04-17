import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from './../guards/auth.guard';
import { Public } from './../decorators/public.decorator';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { UUID } from 'crypto';

@ApiTags('Products')
@Controller('products')
// Protegemos el controler completo
// pero definimos dos endpoints como públicos
@UseGuards(AuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Public()
  getProducts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ) {
    return this.productsService.findAll(page, limit);
  }

  @Get('seeder')
  @Public()
  addProducts() {
    return this.productsService.preLoadProducts();
  }

  @Get(':id')
  @Public()
  getProductById(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.productsService.findOne(id);
  }

  @ApiBearerAuth()
  @Post()
  createProduct(@Body() product: CreateProductDto) {
    return this.productsService.create(product);
  }

  @ApiBearerAuth()
  @Put(':id')
  updateProduct(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @ApiBearerAuth()
  @Delete(':id')
  deleteProduct(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.productsService.remove(id);
  }
}
