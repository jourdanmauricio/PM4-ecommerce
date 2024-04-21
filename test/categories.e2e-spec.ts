import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';

import typeOrmConfig from '../src/config/typeormTest';

// import { AppModule } from '../src/app.module';
import { Users } from '../src/entities/users.entity';
import { CategoriesModule } from '../src/categories/categories.module';
import { Categories } from '../src/entities/categories.entity';
import { Products } from '../src/entities/products.entity';
import { OrderDetails } from '../src/entities/orderDetails.entity';
import { Orders } from '../src/entities/orders.entity';

//////////////////
// #region APP
//////////////////
let app: INestApplication;

let server = null;

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        load: [typeOrmConfig],
      }),
      TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (configService: ConfigService) =>
          configService.get('typeormTest'),
      }),
      TypeOrmModule.forFeature([
        Users,
        Categories,
        Products,
        OrderDetails,
        Orders,
      ]),
      // AppModule,
      CategoriesModule,
    ],
  }).compile();

  app = moduleFixture.createNestApplication();

  server = await app.init();
});

afterAll(async () => {
  await server.close();
});

//////////////////////////
// #region Categories
//////////////////////////

describe('Categories', () => {
  it('GET /seeder should return an object ({ message: "Categories added" }) ', async () => {
    await request(app.getHttpServer())
      .get('/categories/seeder')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'Categories added',
      });
  });

  it('GET /  should return list of categories', async () => {
    return await request(app.getHttpServer())
      .get('/categories')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        // console.log('******************************************');
        // console.log('All Categories:', response.body);
        // console.log('******************************************');
        expect(response.body.length).toEqual(4);
      });
  });
});
