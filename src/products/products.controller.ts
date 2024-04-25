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
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from './../guards/auth.guard';
import { Public } from './../decorators/public.decorator';
import { ProductsService } from './products.service';
import {
  CreateProductDto,
  // FilterProductDto,
  UpdateProductDto,
} from './product.dto';
import { UUID } from 'crypto';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../models/roles.enum';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Products')
@Controller('products')
// Protegemos el controler completo
// pero definimos dos endpoints como públicos
@UseGuards(AuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Public()
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Número de página',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Número máximo de productos a retornar',
  })
  getProducts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ) {
    return this.productsService.findAll(page, limit);
  }

  @ApiBearerAuth()
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
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  createProduct(@Body() product: CreateProductDto) {
    return this.productsService.create(product);
  }

  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  updateProduct(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  deleteProduct(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.productsService.remove(id);
  }
}
