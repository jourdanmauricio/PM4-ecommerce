import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { generateCategories } from '../data/category.fake';

let categoriesController: CategoriesController;

const fakeCategories = generateCategories(10);
// const fakeCategorie = generateCategory();
const mockCategoriesService = {
  getAllCategories: jest.fn().mockImplementation(() => fakeCategories),
  preLoadCategories: jest.fn().mockImplementation(() => ({
    message: 'Categories added',
  })),
};

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    controllers: [CategoriesController],
    providers: [
      { provide: CategoriesService, useValue: mockCategoriesService },
    ],
  }).compile();

  categoriesController = module.get<CategoriesController>(CategoriesController);
});

describe('CategoryController', () => {
  it('Should be defined', async () => {
    expect(categoriesController).toBeDefined();
  });

  it('GET / getCategories() should return list of categories', async () => {
    const categories = await categoriesController.getCategories();
    expect(categories).toEqual(fakeCategories);
    expect(mockCategoriesService.getAllCategories).toHaveBeenCalled();
  });

  it('seeder/ addCategories() should return an object ({ message: "Categories added" }) ', async () => {
    const message = await categoriesController.addCategories();
    expect(message).toEqual({
      message: 'Categories added',
    });
    expect(mockCategoriesService.preLoadCategories).toHaveBeenCalled();
  });
});
