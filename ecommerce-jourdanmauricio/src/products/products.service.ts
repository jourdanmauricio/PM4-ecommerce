import { Injectable } from '@nestjs/common';

import { ProductsRepository } from './products.repository';
import {
  CreateProductDto,
  FilterProductDto,
  Product,
  UpdateProductDto,
} from './product.dto';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  getProducts(params?: FilterProductDto) {
    return this.productsRepository.getProducts(params);
  }

  getProductById(id: number): Promise<Product> {
    return this.productsRepository.getById(id);
  }

  createProduct(product: CreateProductDto): Promise<Product> {
    return this.productsRepository.createProduct(product);
  }

  updateProduct(id: number, changes: UpdateProductDto) {
    return this.productsRepository.updateProduct(id, changes);
  }

  deleteProduct(id: number) {
    return this.productsRepository.deleteProduct(id);
  }
}
