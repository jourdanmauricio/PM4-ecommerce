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
  // Permite ingresar información
  // para el copntexto del endpoint
  // que podremos acceder desde el guard
  SetMetadata,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { v4 as uuid } from 'uuid';
import { Public } from 'src/auth/public.decorator';

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
    return this.productsService.findAll(Number(page), Number(limit));
  }

  @Get('seeder')
  @Public()
  addProducts() {
    return this.productsService.preLoadProducts();
  }

  @Get(':id')
  @SetMetadata('isPublic', true)
  getProductById(@Param('id', ParseUUIDPipe) id: uuid) {
    return this.productsService.findOne(id);
  }

  @Post()
  createProduct(@Body() product: CreateProductDto) {
    return this.productsService.create(product);
  }

  @Put(':id')
  updateProduct(
    @Param('id', ParseUUIDPipe) id: uuid,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseUUIDPipe) id: uuid) {
    return this.productsService.remove(id);
  }
}
