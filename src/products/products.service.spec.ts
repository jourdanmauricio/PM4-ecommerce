/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { ProductsService } from './products.service';
import { generateProduct, generateProducts } from '../data/product.fake';
import { CategoriesService } from '../categories/categories.service';
import { Categories } from '../entities/categories.entity';
import { generateCategory } from '../data/category.fake';
import { Products } from '../entities/products.entity';

let service: ProductsService;

const fakeProducts = generateProducts(5);
const fakeCategory = generateCategory();

const mockCategoriesRepository = {
  find: jest.fn().mockImplementation((params) => [fakeCategory]),
  findOneBy: jest.fn().mockImplementation((id) => [fakeCategory]),
};
const mockProductsRepository = {
  findAndCount: jest.fn().mockImplementation((params) => {
    return [fakeProducts, params.limit];
  }),
  create: jest.fn().mockImplementation((dto) => dto),
  save: jest
    .fn()
    .mockImplementation((product) =>
      Promise.resolve({ id: Date.now(), ...product }),
    ),
  findOne: jest.fn((id) => fakeProducts[0]),
  findOneBy: jest.fn((email) => fakeProducts[0]),
  merge: jest.fn((id, dto) => {
    const updProd = {
      ...fakeProducts[0],
      ...dto,
    };
    return updProd;
  }),
  delete: jest.fn((id, dto) => fakeProducts[0]),
};

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ProductsService,
      {
        provide: getRepositoryToken(Products),
        useValue: mockProductsRepository,
      },
      CategoriesService,
      {
        provide: getRepositoryToken(Categories),
        useValue: mockCategoriesRepository,
      },
    ],
  }).compile();

  service = module.get<ProductsService>(ProductsService);
});

describe('ProductsService', () => {
  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Products findAll(), ', () => {
    it('Should return a list of products', async () => {
      const response = await service.findAll(1, 5);
      expect(response.products.length).toEqual(fakeProducts.length);
      expect(response.products).toEqual(fakeProducts);
      expect(mockProductsRepository.findAndCount).toHaveBeenCalled();
    });
  });

  describe('Product findOne(id)', () => {
    it('findOne(id), Should return a product', async () => {
      const product = await service.findOne(fakeProducts[0].id);

      expect(product).toEqual(fakeProducts[0]);
      expect(mockProductsRepository.findOne).toHaveBeenCalled();
    });

    it('findOne(id), should return an error NotFoundException(Product not found)', async () => {
      mockProductsRepository.findOne = jest.fn((id) => undefined);
      const dto = { name: 'Product 1' };
      try {
        const product = await service.findOne(fakeProducts[0].id);
      } catch (err) {
        expect(err.message).toEqual('Product not found');
      }
    });
  });

  describe('POST, Product Create', () => {
    it('Should create a new product and return that ', async () => {
      const mockProduct = generateProduct();
      mockProduct.categoryId = fakeCategory.id;
      delete mockProduct.id;

      const newProduct = await service.create(mockProduct);

      expect(newProduct).toEqual({ id: expect.any(Number), ...newProduct });
      expect(mockProductsRepository.create).toHaveBeenCalledWith(mockProduct);
    });
  });

  describe('Product Update()', () => {
    it('Should update a product', async () => {
      mockProductsRepository.findOne = jest.fn((id) => fakeProducts[0]);
      const dto = { name: 'Product 1' };
      const updProduct = await service.update(fakeProducts[0].id, dto);

      expect(updProduct).toEqual({
        ...fakeProducts[0],
        ...dto,
      });
      expect(mockProductsRepository.merge).toHaveBeenCalledWith(
        fakeProducts[0],
        dto,
      );
      expect(mockProductsRepository.save).toHaveBeenCalledWith({
        ...fakeProducts[0],
        ...dto,
      });
    });

    it('Should return an error, Category not found', async () => {
      mockProductsRepository.findOne = jest.fn((id) => fakeProducts[0]);

      mockCategoriesRepository.findOneBy = jest
        .fn()
        .mockImplementation((id) => undefined);

      const dto = { name: 'Product 1' };
      try {
        const updProduct = await service.update(fakeProducts[0].id, dto);
        console.log('updProduct', updProduct);
      } catch (err) {
        expect(err.message).toEqual('Category not found');
      }
    });
  });

  describe('Product remove()', () => {
    it('Should delete a product', async () => {
      mockProductsRepository.findOne = jest.fn((id) => fakeProducts[0]);
      const delProduct = await service.remove(fakeProducts[0].id);

      expect(delProduct).toEqual(fakeProducts[0]);
      expect(mockProductsRepository.delete).toHaveBeenCalledWith(
        fakeProducts[0].id,
      );
    });
  });
});
