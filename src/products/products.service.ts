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
import { Products } from '../entities/products.entity';
import { Categories } from './../entities/categories.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [products, total] = await this.productsRepository.findAndCount({
      skip: skip,
      take: limit,
    });
    return { page, total, products };
  }

  async findOne(id: uuid): Promise<Products> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async create(product: CreateProductDto): Promise<Products> {
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
    const category = await this.categoriesRepository.findOneBy({
      id: changes.categoryId,
    });

    if (!category) throw new BadRequestException('Category not found');

    const product = await this.findOne(id);
    const updProduct = this.productsRepository.merge(product, changes);
    return this.productsRepository.save(updProduct);
  }

  async remove(id: uuid) {
    const product = await this.findOne(id);
    try {
      await this.productsRepository.delete(id);
      return product;
    } catch (error) {
      throw new BadRequestException('El producto posee relaciones con ordenes');
    }
  }

  async preLoadProducts() {
    const categories = await this.categoriesRepository.find();

    initialData.map(async (product) => {
      const category = categories.find((cat) => cat.name === product.category);

      if (category) {
        const newProd = {
          ...product,
          category: category,
        };

        await this.productsRepository
          .createQueryBuilder()
          .insert()
          .values(newProd)
          .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
          .execute();
      }
    });

    return { message: 'Products added' };
  }
}
