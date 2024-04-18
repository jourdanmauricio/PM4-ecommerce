import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { Categories } from '../entities/categories.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { generateCategories } from '../data/category.fake';

let service: CategoriesService;

const fakeCategories = generateCategories(10);

const mockCategoriesRepository = {
  find: jest.fn().mockImplementation(() => fakeCategories),
  createQueryBuilder: jest.fn(),
};

mockCategoriesRepository.createQueryBuilder.mockReturnValue({
  insert: jest.fn().mockReturnThis(), // Chain insert method
  into: jest.fn().mockReturnThis(), // Chain into method (optional)
  values: jest.fn().mockReturnThis(), // Chain values method
  orIgnore: jest.fn().mockReturnThis(), // Handle OR IGNORE clause (optional)
  execute: jest.fn().mockResolvedValue(undefined), // Simulate successful execution
});

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      CategoriesService,
      {
        provide: getRepositoryToken(Categories),
        useValue: mockCategoriesRepository,
      },
    ],
  }).compile();

  service = module.get<CategoriesService>(CategoriesService);
});

describe('UsersService', () => {
  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('Should return a list of categories', async () => {
      const categories = await service.getAllCategories();

      expect(categories.length).toEqual(fakeCategories.length);
      expect(categories).toEqual(fakeCategories);
      expect(mockCategoriesRepository.find).toHaveBeenCalled();
    });
  });

  describe('preLoadCategories()', () => {
    it('Should return an object ({ message: "Categories added" })', async () => {
      const message = await service.preLoadCategories();

      expect(message).toEqual({
        message: 'Categories added',
      });
      expect(mockCategoriesRepository.createQueryBuilder).toHaveBeenCalled();
    });
  });
});
