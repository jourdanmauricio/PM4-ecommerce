import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import * as initialData from './../data/initialData.json';

import { CreateProductDto, UpdateProductDto } from './product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './products.entity';
import { Category } from 'src/categories/categories.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [products, total] = await this.productsRepository.findAndCount({
      skip: skip,
      take: limit,
    });
    return { page, total, products };
  }

  async findOne(id: uuid): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async create(product: CreateProductDto): Promise<Product> {
    const category = await this.categoriesRepository.findOneBy({
      id: product.categoryId,
    });

    if (!category) throw new BadRequestException('Category not found');

    const newProduct = this.productsRepository.create(product);

    newProduct.category = category;

    const result = await this.productsRepository
      .save(newProduct)
      .catch((err: any) => {
        throw new BadRequestException(err.detail);
      });
    return result;
  }

  async update(id: uuid, changes: UpdateProductDto) {
    const product = await this.findOne(id);
    this.productsRepository.merge(product, changes);
    return this.productsRepository.save(product);
  }

  async remove(id: uuid) {
    const product = await this.findOne(id);
    await this.productsRepository.delete(id);
    return product;
  }

  async preLoadProducts() {
    const prodCreated = [];
    const prodFound = [];
    const prodError = [];

    for await (const product of initialData) {
      const found = await this.productsRepository.findOneBy({
        name: product.name,
      });
      if (!found) {
        const category = await this.categoriesRepository.findOneBy({
          name: product.category,
        });
        if (!category) {
          prodError.push({
            product: product.name,
            error: `Category not found: ${product.category}`,
          });
        } else {
          const newProd = {
            ...product,
            categoryId: category.id,
          };
          delete newProd.category;
          const newProduct = await this.create(newProd);
          prodCreated.push({ id: newProduct.id, name: newProduct.name });
        }
      } else {
        prodFound.push({ id: found.id, name: found.name });
      }
    }

    return {
      message: 'Initial products loaded successfully',
      total: initialData.length,
      data: {
        created: prodCreated,
        found: prodFound,
        errors: prodError,
      },
    };
  }
}
