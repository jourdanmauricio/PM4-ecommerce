import { Test, TestingModule } from '@nestjs/testing';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import typeOrmConfig from '../src/config/typeormTest';
import { ConfigModule } from '@nestjs/config';

// import { AppModule } from '../src/app.module';
import { Users } from '../src/entities/users.entity';
import { AuthModule } from '../src/auth/auth.module';
import { ProductsModule } from '../src/products/products.module';
import { Categories } from '../src/entities/categories.entity';
import { Products } from '../src/entities/products.entity';
import { OrderDetails } from '../src/entities/orderDetails.entity';
import { Orders } from '../src/entities/orders.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserSeeder } from '../src/data/usersSeeder';
import { CategoriesModule } from '../src/categories/categories.module';
import { generateUser } from '../src/data/user.fake';
import { generateProduct } from '../src/data/product.fake';
import { Reflector } from '@nestjs/core';
import { UUID } from 'crypto';

//////////////////
// #region APP
//////////////////
let app: INestApplication;

let server = null;
let adminAccessToken = null;
let user;
let categories: Categories[];
let mockProduct = generateProduct();
delete mockProduct.id;

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
      AuthModule,
      ProductsModule,
      CategoriesModule,
      TypeOrmModule.forFeature([
        Users,
        Categories,
        Products,
        OrderDetails,
        Orders,
      ]),
      JwtModule.register({
        global: true,
        signOptions: { expiresIn: '1h' },
        secret: process.env.JWT_SECRET,
      }),
    ],
    providers: [UserSeeder],
  }).compile();

  app = moduleFixture.createNestApplication();

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  server = await app.init();
  // Seeder users
  const usersSeeder = app.get<UserSeeder>(UserSeeder);
  await usersSeeder.runAdmin();
  await usersSeeder.runCustomers();
  await usersSeeder.runTestCustomer();

  // Login admin user
  const admin = await request(app.getHttpServer())
    .post('/auth/signin')
    .send({ email: 'jourdanmau@mail.com', password: 'Aa$12345678' });

  adminAccessToken = admin.body.token;

  // Generate customer user
  const mockUser = generateUser();
  delete mockUser.id;
  const customerUser = await request(app.getHttpServer())
    .post('/auth/signup')
    .send({
      ...mockUser,
      password: 'Aa$12345678',
      confPassword: 'Aa$12345678',
    });

  user = customerUser.body;
});

afterAll(async () => {
  await server.close();
});

describe('Products', () => {
  //////////////////////////
  // #region GET
  //////////////////////////
  describe('GET', () => {
    it('Should return an empty array', async () => {
      return await request(app.getHttpServer())
        .get('/products?page=1&limit=30')
        .expect('Content-Type', /json/)
        // .set({ Authorization: `Bearer ${adminAccessToken}` })
        .expect(200)
        .then((response) => {
          // console.log('******************************************');
          // console.log('All Products:', response.body);
          // console.log('******************************************');
          expect(response.body.products.length).toEqual(0);
        });
    });
    it('GET /seeder, should return an object ({ message: "Products added" }) ', async () => {
      await request(app.getHttpServer())
        .get('/categories/seeder')
        .expect('Content-Type', /json/)
        .expect(200, {
          message: 'Categories added',
        });

      await request(app.getHttpServer())
        .get('/categories')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          categories = response.body;
          expect(response.body.length).toEqual(4);
        });

      return await request(app.getHttpServer())
        .get('/products/seeder')
        .expect('Content-Type', /json/)
        .expect(200, {
          message: 'Products added',
        });
    });
    it('Should return a list of products', async () => {
      return await request(app.getHttpServer())
        .get('/products?page=1&limit=30')
        .expect('Content-Type', /json/)
        // .set({ Authorization: `Bearer ${adminAccessToken}` })
        .expect(200)
        .then((response) => {
          // console.log('******************************************');
          // console.log('All Products:', response.body);
          // console.log('******************************************');
          expect(response.body.products.length).toEqual(12);
        });
    });
  });
  //////////////////////////
  // #region POST
  //////////////////////////
  describe('POST', () => {
    it('Should return an error 401, Unauthorized (Unauthorized)', async () => {
      await request(app.getHttpServer())
        .post('/products')
        .send(mockProduct)
        .expect(401, {
          message: 'Unauthorized',
          error: 'Unauthorized',
          statusCode: 401,
        });
    });

    it('Should return an error 400, Bad Request (Category not found)', async () => {
      await request(app.getHttpServer())
        .post('/products')
        .set({ Authorization: `Bearer ${adminAccessToken}` })
        .send(mockProduct)
        .expect(400, {
          message: 'Category not found',
          error: 'Bad Request',
          statusCode: 400,
        });
    });

    it('Should return an error 400, Bad Request (Property otherProp should not exist)', async () => {
      mockProduct.categoryId = categories[0].id as UUID;
      await request(app.getHttpServer())
        .post('/products')
        .set({ Authorization: `Bearer ${adminAccessToken}` })
        .send({
          ...mockProduct,
          otherProp: 'Aa$12345678',
        })
        .expect(400, {
          message: ['property otherProp should not exist'],
          error: 'Bad Request',
          statusCode: 400,
        });
    });

    it('Should return an error 400, Bad Request (Stock should not be empty)', async () => {
      const mockProduct2 = { ...mockProduct };
      delete mockProduct2.stock;

      mockProduct.categoryId = categories[0].id as UUID;
      await request(app.getHttpServer())
        .post('/products')
        .set({ Authorization: `Bearer ${adminAccessToken}` })
        .send(mockProduct2)
        .expect(400, {
          message: [
            'stock should not be empty',
            'stock must be a positive number',
          ],
          error: 'Bad Request',
          statusCode: 400,
        });
    });

    it('Should return an error 400, Bad Request (Stock must be a positive number)', async () => {
      const mockProduct2 = { ...mockProduct };
      mockProduct2.stock = -1;

      mockProduct.categoryId = categories[0].id as UUID;
      await request(app.getHttpServer())
        .post('/products')
        .set({ Authorization: `Bearer ${adminAccessToken}` })
        .send(mockProduct2)
        .expect(400, {
          message: ['stock must be a positive number'],
          error: 'Bad Request',
          statusCode: 400,
        });
    });

    it('Should create a new product and return that', async () => {
      mockProduct.categoryId = categories[0].id as UUID;
      const response = await request(app.getHttpServer())
        .post('/products')
        .set({ Authorization: `Bearer ${adminAccessToken}` })
        .send(mockProduct);

      delete response.body.category;
      mockProduct = response.body;

      expect(response.statusCode).toBe(201);
      expect(response.body.name).toEqual(mockProduct.name);
    });

    it('Should return an error 400, Bad Request (Ya existe la llave (name))', async () => {
      mockProduct.categoryId = categories[0].id as UUID;
      const mockProduct2 = { ...mockProduct };
      delete mockProduct2.id;
      await request(app.getHttpServer())
        .post('/products')
        .set({ Authorization: `Bearer ${adminAccessToken}` })
        .send(mockProduct2)
        .expect(400, {
          message: `Ya existe la llave (name)=(${mockProduct2.name}).`,
          error: 'Bad Request',
          statusCode: 400,
        });
    });
  });
  //////////////////////////
  // #region GET :id
  //////////////////////////
  describe('GET :id', () => {
    it('Should return a product', async () => {
      return await request(app.getHttpServer())
        .get(`/products/${mockProduct.id}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.name).toEqual(mockProduct.name);
        });
    });
    it('Should return an error 400, Bad Request (Validation failed (uuid is expected))', async () => {
      console.log('mockProduct.id', mockProduct.id);
      return await request(app.getHttpServer())
        .get('/products/producto1')
        .expect('Content-Type', /json/)
        .expect(400, {
          message: 'Validation failed (uuid is expected)',
          error: 'Bad Request',
          statusCode: 400,
        });
    });
    it('Should return an error 404, NotFoundException (Product not found)', async () => {
      return await request(app.getHttpServer())
        .get('/products/c4ea2312-f839-4d0b-bb9d-379818fbe74f')
        .expect(404, {
          message: 'Product not found',
          error: 'Not Found',
          statusCode: 404,
        });
    });
  });
  //////////////////////////
  // #region PUT
  //////////////////////////
  describe('PUT', () => {
    it('without token, should return an error 401, Unauthorized (Unauthorized)', async () => {
      return await request(app.getHttpServer())
        .put(`/products/${mockProduct.id}`)
        .send({ name: 'Motorola Razr 40 Ultra' })
        // .set({ Authorization: `Bearer ${adminAccessToken}` })
        .expect('Content-Type', /json/)
        .expect(401, {
          message: 'Unauthorized',
          error: 'Unauthorized',
          statusCode: 401,
        });
    });

    it('with user token, should return an error 403, Forbidden (Forbidden resource)', async () => {
      return await request(app.getHttpServer())
        .put(`/products/${mockProduct.id}`)
        .send({ name: 'Motorola Razr 40 Ultra' })
        .set({ Authorization: `Bearer ${user.token}` })
        .expect('Content-Type', /json/)
        .expect(403, {
          message: 'Forbidden resource',
          error: 'Forbidden',
          statusCode: 403,
        });
    });

    it('Should update a product', async () => {
      return await request(app.getHttpServer())
        .put(`/products/${mockProduct.id}`)
        .send({ name: 'Motorola Razr 40 Ultra' })
        .set({ Authorization: `Bearer ${adminAccessToken}` })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.name).toEqual('Motorola Razr 40 Ultra');
        });
    });

    it('should return an error 404, NotFoundException (Product not found)', async () => {
      return await request(app.getHttpServer())
        .put(`/products/c4ea2312-f839-4d0b-bb9d-379818fbe74f`)
        .send({ name: 'Motorola Razr 40 Ultra' })
        .set({ Authorization: `Bearer ${adminAccessToken}` })
        .expect('Content-Type', /json/)
        .expect(404, {
          message: 'Product not found',
          error: 'Not Found',
          statusCode: 404,
        });
    });

    it('Should return an error 400, Bad Request (Price must be a positive number)', async () => {
      return await request(app.getHttpServer())
        .put(`/products/${mockProduct.id}`)
        .send({ price: -100.25 })
        .set({ Authorization: `Bearer ${adminAccessToken}` })
        .expect(400, {
          message: ['price must be a positive number'],
          error: 'Bad Request',
          statusCode: 400,
        });
    });

    it('Should return an error 400, Bad Request (Property should not exist)', async () => {
      return await request(app.getHttpServer())
        .put(`/products/${mockProduct.id}`)
        .send({ avaliableQuantity: 200 })
        .set({ Authorization: `Bearer ${adminAccessToken}` })
        .expect('Content-Type', /json/)
        .expect(400, {
          message: ['property avaliableQuantity should not exist'],
          error: 'Bad Request',
          statusCode: 400,
        });
    });
  });

  //////////////////////////
  // #region DELETE
  //////////////////////////
  describe('DELETE /:id', () => {
    it('Without token, should return an error 401, Unauthorized (Unauthorized)', async () => {
      return await request(app.getHttpServer())
        .delete(`/products/${mockProduct.id}`)
        // .set({ Authorization: `Bearer ${adminAccessToken}` })
        .expect('Content-Type', /json/)
        .expect(401, {
          message: 'Unauthorized',
          error: 'Unauthorized',
          statusCode: 401,
        });
    });

    it('With user token, should return an error 403, Forbidden (Forbidden resource)', async () => {
      return await request(app.getHttpServer())
        .delete(`/products/${mockProduct.id}`)
        .send({ name: 'Motorola Razr 40 Ultra' })
        .set({ Authorization: `Bearer ${user.token}` })
        .expect('Content-Type', /json/)
        .expect(403, {
          message: 'Forbidden resource',
          error: 'Forbidden',
          statusCode: 403,
        });
    });

    it('Should return an error 404, NotFoundException (Product not found)', async () => {
      return await request(app.getHttpServer())
        .delete(`/products/c4ea2312-f839-4d0b-bb9d-379818fbe74f`)
        .send({ name: 'Motorola Razr 40 Ultra' })
        .set({ Authorization: `Bearer ${adminAccessToken}` })
        .expect('Content-Type', /json/)
        .expect(404, {
          message: 'Product not found',
          error: 'Not Found',
          statusCode: 404,
        });
    });

    it('Should delete a product', async () => {
      return await request(app.getHttpServer())
        .delete(`/products/${mockProduct.id}`)
        .set({ Authorization: `Bearer ${adminAccessToken}` })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          // console.log('response', response.body);
          expect(response.body.id).toEqual(mockProduct.id);
        });
    });
  });
});
