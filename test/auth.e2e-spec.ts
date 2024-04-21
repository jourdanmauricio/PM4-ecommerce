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

// import { AppModule } from '../src/app.module';
import { Reflector } from '@nestjs/core';
import { generateUser } from '../src/data/user.fake';
import { ConfigModule } from '@nestjs/config';
import { UserSeeder } from '../src/data/usersSeeder';
import { Users } from '../src/entities/users.entity';
import { AuthModule } from '../src/auth/auth.module';
import { OrderDetails } from '../src/entities/orderDetails.entity';
import { Products } from '../src/entities/products.entity';
import { Categories } from '../src/entities/categories.entity';

//////////////////
// #region APP
//////////////////
let app: INestApplication;

let server = null;
let adminAccessToken = null;

describe('Auth', () => {
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
        // AppModule,
        TypeOrmModule.forFeature([
          Users,
          Categories,
          Products,
          OrderDetails,
          //Orders,
        ]),
        AuthModule,

        JwtModule.register({
          global: true,
          signOptions: { expiresIn: '1h' },
          secret: process.env.JWT_SECRET,
        }),
      ],
      providers: [UserSeeder],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    // Seeder users
    const seeder = app.get<UserSeeder>(UserSeeder);
    await seeder.runAdmin();
    await seeder.runCustomers();
    await seeder.runTestCustomer();

    server = await app.init();
  });

  afterAll(async () => {
    await server.close();
  });

  //////////////////////////
  // #region AUTH - SIGNIN
  //////////////////////////

  describe('signin', () => {
    it('signin(), Login admin user )', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/signin')
        .send({ email: 'jourdanmau@mail.com', password: 'Aa$12345678' });

      adminAccessToken = response.body.token;

      const statusCode = response.statusCode;
      expect(statusCode).toEqual(201);
      return response;
    });

    it('signin(), when the email does not have a valid format should return an error 401, Unauthorized, Invalid credenttials', async () => {
      return await request(app.getHttpServer())
        .post('/auth/signin')
        .send({ email: 'jourdanpaomail.com', password: 'Aa$12345678' })
        .expect(401, {
          message: 'Invalid credenttials',
          error: 'Unauthorized',
          statusCode: 401,
        });
    });
    it('signin(), when the user does not exist it should return an error 401, Unauthorized, Invalid credenttials', async () => {
      return await request(app.getHttpServer())
        .post('/auth/signin')
        .send({
          email: 'jourdanpao@example.com',
          password: 'Aa$12345678',
        })
        .expect(401, {
          message: 'Invalid credenttials',
          error: 'Unauthorized',
          statusCode: 401,
        });
    });
    it('signin(), when the password is wrong it should return an error 401, Unauthorized, Invalid credenttials', async () => {
      return await request(app.getHttpServer())
        .post('/auth/signin')
        .send({
          email: 'jourdanpao@mail.com',
          password: 'wrong_password',
        })
        .expect(401, {
          message: 'Invalid credenttials',
          error: 'Unauthorized',
          statusCode: 401,
        });
    });
  });

  //////////////////////////
  // #region AUTH - SIGNUP
  //////////////////////////

  describe('signup', () => {
    it('signup(), Should create a new user and return that', async () => {
      const mockUser = generateUser();
      delete mockUser.id;

      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          ...mockUser,
          password: 'Aa$12345678',
          confPassword: 'Aa$12345678',
        });

      expect(response.statusCode).toBe(201);
      expect(response.body.name).toEqual(mockUser.name);
    });

    it('signup(), Should return an error 400 (BadRequest), passwords no match', async () => {
      const mockUser = generateUser();
      delete mockUser.id;

      return await request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          ...mockUser,
          name: 'Paola Jourdan',
          password: 'Aa$12345678',
          confPassword: 'Aa$123456789',
        })
        .expect(400, {
          message: ['Passwords do not match'],
          error: 'Bad Request',
          statusCode: 400,
        });
      // .then((response) => {
      //   console.log('response', response.body);
      // });
    });

    it('signup(), Should return an error 400 (BadRequest), body error', async () => {
      const mockUser = generateUser();
      delete mockUser.id;

      return await request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          ...mockUser,
          name: 12345678,
          password: 'Aa$12345678',
          confPassword: 'Aa$12345678',
        })
        .expect(400, {
          message: [
            'name must be shorter than or equal to 50 characters',
            'name must be longer than or equal to 3 characters',
            'name must be a string',
          ],
          error: 'Bad Request',
          statusCode: 400,
        });
    });
    it('signup(), Should return an error 400, Bad Request, property should not exist', async () => {
      const mockUser = generateUser();
      delete mockUser.id;

      return await request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          ...mockUser,
          password: 'Aa$12345678',
          confPassword: 'Aa$12345678',
          other: 'additional property',
        })
        .set({ Authorization: `Bearer ${adminAccessToken}` })
        .expect('Content-Type', /json/)
        .expect(400, {
          message: ['property other should not exist'],
          error: 'Bad Request',
          statusCode: 400,
        });
    });

    it('signup(), Should return an error 400, Bad Request, Email is already in use', async () => {
      const mockUser = generateUser();
      delete mockUser.id;

      return await request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          ...mockUser,
          password: 'Aa$12345678',
          confPassword: 'Aa$12345678',
          email: 'jourdanpao@mail.com',
        })
        .set({ Authorization: `Bearer ${adminAccessToken}` })
        .expect('Content-Type', /json/)
        .expect(400, {
          message: 'Email is already in use',
          error: 'Bad Request',
          statusCode: 400,
        });
    });
  });
});
