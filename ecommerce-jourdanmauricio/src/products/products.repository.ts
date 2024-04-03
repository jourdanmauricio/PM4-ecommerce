import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateProductDto,
  FilterProductDto,
  Product,
  UpdateProductDto,
} from './product.dto';

@Injectable()
export class ProductsRepository {
  private products = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 10,
      stock: true,
      imgUrl: 'https://image1.com',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description 2',
      price: 20,
      stock: true,
      imgUrl: 'https://image2.com',
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Description 3',
      price: 30,
      stock: true,
      imgUrl: 'https://image3.com',
    },
    {
      id: 4,
      name: 'Product 4',
      description: 'Description 4',
      price: 30,
      stock: true,
      imgUrl: 'https://image3.com',
    },
    {
      id: 5,
      name: 'Product 5',
      description: 'Description 5',
      price: 30,
      stock: true,
      imgUrl: 'https://image3.com',
    },
  ];

  async getProducts(params?: FilterProductDto) {
    const { limit = 5, page = 1 } = params;
    // Calcular índice de inicio y fin
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    // Paginar array
    const products = this.products.slice(startIndex, endIndex);

    return { page, products };
  }

  async getById(id: number) {
    const user = this.products.find((user) => user.id === id);
    if (!user) throw new NotFoundException('Product not found');
    return user;
  }

  async createProduct(product: CreateProductDto) {
    const id = this.products.length + 1;
    this.products = [...this.products, { id, ...product }];
    return { id, ...product };
  }

  async updateProduct(id: number, changes: UpdateProductDto) {
    const product: Product = await this.getById(id);

    if (product) {
      const index = this.products.findIndex((item) => item.id === id);
      this.products[index] = {
        ...product,
        ...changes,
      };
      return this.products[index];
    }
    return null;
  }

  async deleteProduct(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException('Product not found');
    this.products.splice(index, 1);
    return { id };
  }
}
