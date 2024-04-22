/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { generateProduct, generateProducts } from '../data/product.fake';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { JwtService } from '@nestjs/jwt';
import { APP_PIPE } from '@nestjs/core';
import { ParseUUIDPipe } from '@nestjs/common';
import { UUID } from 'crypto';

let controller: ProductsController;

const fakeProducts = generateProducts(10);
// const fakeCategory = generateCategory();
const fakeProduct = generateProduct();
// const fakeCategorie = generateCategory();
const mockProductsService = {
  findAll: jest.fn().mockImplementation(() => fakeProducts),
  preLoadProducts: jest.fn().mockImplementation(() => ({
    message: 'Products added',
  })),
  findOne: jest.fn((id) => fakeProduct),
  create: jest.fn((id) => fakeProduct),
  update: jest.fn((id, dto) => ({
    ...fakeProduct,
    ...dto,
  })),
  remove: jest.fn((id) => fakeProducts[0]),
};

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    controllers: [ProductsController],
    providers: [
      JwtService,
      {
        provide: APP_PIPE,
        useClass: ParseUUIDPipe,
      },
      { provide: ProductsService, useValue: mockProductsService },
    ],
  }).compile();

  controller = module.get<ProductsController>(ProductsController);
});

describe('ProductsController', () => {
  it('Should be defined', async () => {
    expect(controller).toBeDefined();
  });

  it('GET / getProducts() should return list of products', async () => {
    const products = await controller.getProducts(1, 5);
    expect(products).toEqual(fakeProducts);
    expect(mockProductsService.findAll).toHaveBeenCalled();
  });

  it('seeder/ addProducts() should call preLoadProducts method', async () => {
    const message = await controller.addProducts();
    // expect(message).toEqual({
    //   message: 'Products added',
    // });
    expect(mockProductsService.preLoadProducts).toHaveBeenCalled();
  });

  it('GET :id, Should return a product', async () => {
    const product = await controller.getProductById(fakeProduct.id as UUID);
    expect(product).toEqual(fakeProduct);
    expect(mockProductsService.findOne).toHaveBeenCalled();
  });

  it('POST, should return a new product', async () => {
    const product = await controller.createProduct(fakeProduct);

    expect(product).toEqual(fakeProduct);
    expect(mockProductsService.create).toHaveBeenCalledWith(product);
  });

  it('PUT, Should update a product', async () => {
    const dto = { name: 'Iphone' };
    const updUser = await controller.updateProduct(fakeProduct.id as UUID, dto);
    expect(updUser).toEqual({
      ...fakeProduct,
      ...dto,
    });
    expect(mockProductsService.update).toHaveBeenCalledWith(
      fakeProduct.id,
      dto,
    );
  });

  it('DELETE, Should delete a product', async () => {
    const delProduct = await controller.deleteProduct(fakeProducts[0].id);
    expect(delProduct).toEqual(fakeProducts[0]);
    expect(mockProductsService.remove).toHaveBeenCalledWith(fakeProducts[0].id);
  });
});
