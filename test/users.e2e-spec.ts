import { Test, TestingModule } from '@nestjs/testing';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import typeOrmConfig from '../src/config/typeormTest';
import { ConfigModule } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

//import { AppModule } from '../src/app.module';
import { generateUser } from '../src/data/user.fake';
import { UserSeeder } from '../src/data/usersSeeder';
import { Users } from '../src/entities/users.entity';
import { Categories } from '../src/entities/categories.entity';
import { Products } from '../src/entities/products.entity';
import { OrderDetails } from '../src/entities/orderDetails.entity';
import { Orders } from '../src/entities/orders.entity';
import { UsersModule } from '../src/users/users.module';
import { AuthModule } from '../src/auth/auth.module';

//////////////////
// #region APP
//////////////////
let app: INestApplication;

let server = null;
let adminAccessToken = null;
let user;
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
      //TypeOrmModule.forFeature([Users]),
      //AppModule,
      AuthModule,
      UsersModule,
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

  // Seeder users
  const userSeeder = app.get<UserSeeder>(UserSeeder);
  await userSeeder.runAdmin();
  await userSeeder.runCustomers();
  await userSeeder.runTestCustomer();

  server = await app.init();

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

describe('Users', () => {
  ///////////////////////
  // #region USERS - GET
  ///////////////////////
  describe('GET / ', () => {
    it('Should return a list of users', async () => {
      return await request(app.getHttpServer())
        .get('/users?page=1&limit=30')
        .expect('Content-Type', /json/)
        .set({ Authorization: `Bearer ${adminAccessToken}` })
        .expect(200)
        .then((response) => {
          // console.log('******************************************');
          // console.log('All users:', response.body.users.length);
          // console.log('******************************************');
          expect(response.body.users.length).toEqual(25);
        });
    });
  });

  describe('GET / ', () => {
    it('Should return an error 403, Forbidden (Forbidden resource)', async () => {
      return await request(app.getHttpServer())
        .get('/users?page=1&limit=30')
        .set({ Authorization: `Bearer ${user.token}` })
        .expect(403, {
          message: 'Forbidden resource',
          error: 'Forbidden',
          statusCode: 403,
        });
    });
  });

  describe('GET /:id', () => {
    it('Should return a user', async () => {
      return await request(app.getHttpServer())
        .get(`/users/${user.id}`)
        .expect('Content-Type', /json/)
        .set({ Authorization: `Bearer ${adminAccessToken}` })
        .expect(200)
        .then((response) => {
          // console.log('response', response);
          expect(response.body.email).toEqual(user.email);
        });
    });

    it('Should return an error 400, Bad Request (Validation failed (uuid is expected))', async () => {
      return await request(app.getHttpServer())
        .get(`/users/aaaaa`)
        .expect('Content-Type', /json/)
        .set({ Authorization: `Bearer ${adminAccessToken}` })
        .expect(400, {
          message: 'Validation failed (uuid is expected)',
          error: 'Bad Request',
          statusCode: 400,
        });
    });

    it('Should return an error 401, Unauthorized (Unauthorized)', async () => {
      return await request(app.getHttpServer())
        .get(`/users/${user.id}`)
        .expect('Content-Type', /json/)
        // .set({ Authorization: `Bearer ${adminAccessToken}` })
        .expect(401)
        .then((response) => {
          // console.log('response', response.body);
          expect(response.body).toEqual({
            message: 'Unauthorized',
            error: 'Unauthorized',
            statusCode: 401,
          });
        });
    });

    it('Should return an error 404, Not Found (User not found)', async () => {
      return await request(app.getHttpServer())
        .get('/users/c4ea2312-f839-4d0b-bb9d-379818fbe74f')
        .set({ Authorization: `Bearer ${adminAccessToken}` })
        .expect(404, {
          message: 'User not found',
          error: 'Not Found',
          statusCode: 404,
        });
    });
  });

  ///////////////////////
  // #region USERS - PUT
  ///////////////////////
  describe('PUT /:id', () => {
    it('Should update a user', async () => {
      return await request(app.getHttpServer())
        .put(`/users/${user.id}`)
        .send({ name: 'Paola Andrea Jourdán' })
        .set({ Authorization: `Bearer ${adminAccessToken}` })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          // console.log('response', response.body);
          expect(response.body.name).toEqual('Paola Andrea Jourdán');
        });
    });
    it('Should return an error 404, Not Found (User not found)', async () => {
      return await request(app.getHttpServer())
        .put('/users/c4ea2312-f839-4d0b-bb9d-379818fbe74f')
        .send({ name: 'Paola Andrea Jourdán' })
        .set({ Authorization: `Bearer ${adminAccessToken}` })
        .expect(404, {
          message: 'User not found',
          error: 'Not Found',
          statusCode: 404,
        });
    });

    it('Should return an error 400, Bad Request (Email must be an email)', async () => {
      return await request(app.getHttpServer())
        .put('/users/c4ea2312-f839-4d0b-bb9d-379818fbe74c')
        .send({ email: 'jourdanpaomail.com' })
        .set({ Authorization: `Bearer ${adminAccessToken}` })
        .expect(400, {
          message: ['email must be an email'],
          error: 'Bad Request',
          statusCode: 400,
        });
    });

    it('Should return an error 400, Bad Request (Property should not exist)', async () => {
      return await request(app.getHttpServer())
        .put('/users/c4ea2312-f839-4d0b-bb9d-379818fbe74c')
        .send({ lastname: ' Jourdán' })
        .set({ Authorization: `Bearer ${adminAccessToken}` })
        .expect('Content-Type', /json/)
        .expect(400, {
          message: ['property lastname should not exist'],
          error: 'Bad Request',
          statusCode: 400,
        });
    });
  });

  //////////////////////////
  // #region USERS - DELETE
  //////////////////////////

  describe('DELETE /:id', () => {
    it('Should delete a user', async () => {
      return await request(app.getHttpServer())
        .delete(`/users/${user.id}`)
        .set({ Authorization: `Bearer ${adminAccessToken}` })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          // console.log('response', response.body);
          expect(response.body.id).toEqual(user.id);
        });
    });
    it('Should return an error 404, Not Found (User not found)', async () => {
      return await request(app.getHttpServer())
        .delete('/users/c4ea2312-f839-4d0b-bb9d-379818fbe74f')
        .set({ Authorization: `Bearer ${adminAccessToken}` })
        .expect(404, {
          message: 'User not found',
          error: 'Not Found',
          statusCode: 404,
        });
      // .then((response) => {
      //   console.log('response', response.body);
      // });
    });
  });
});
