import { Injectable } from '@nestjs/common';

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
  ];

  async getProducts() {
    return this.products;
  }
}
