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

import { AppModule } from '../src/app.module';
// import { AuthModule } from '../src/auth/auth.module';
import { Reflector } from '@nestjs/core';
import { generateUser } from '../src/data/user.fake';
import { ConfigModule } from '@nestjs/config';
import { AdminUserSeeder } from '../src/data/usersSeeder';
import { Users } from './../src/entities/users.entity';

describe('AppController (e2e)', () => {
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
        TypeOrmModule.forFeature([Users]),
        // AuthModule,
        AppModule,
        JwtModule.register({
          global: true,
          signOptions: { expiresIn: '1h' },
          secret: process.env.JWT_SECRET,
        }),
      ],
      providers: [AdminUserSeeder],
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
    const seeder = app.get<AdminUserSeeder>(AdminUserSeeder);
    await seeder.runAdmin();
    await seeder.runCustomers();
    await seeder.runTestCustomer();

    server = await app.init();
  });

  afterAll(async () => {
    await server.close();
  });

  let adminAccessToken = null;
  let user;

  describe('App', () => {
    it('/ (GET health)', async () => {
      return await request(app.getHttpServer())
        .get('/health')
        .expect(200)
        .expect('Server running correctly');
    });
    describe('Auth', () => {
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
      describe('signup', () => {
        // passwords no match
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

          user = response.body;

          expect(response.statusCode).toBe(201);
          expect(response.body.name).toEqual(mockUser.name);
          // expect(mockUsersRepository.create).toHaveBeenCalled();
        });
        it('signup(), Should return an error 400 (BadRequest)', async () => {
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

        //////////////////////////
        // #region AUTH - SIGNUP
        //////////////////////////
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

    describe('Users', () => {
      ///////////////////////
      // #region USERS - GET
      ///////////////////////
      describe('GET / ', () => {
        it('findAll(), Should return a list of users', async () => {
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
        it('findAll(), Should return an error 403, Forbidden resource', async () => {
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
        it('findOne(id), Should return a user', async () => {
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

        it('findOne(id), Should return an error 400 (Bad Request), Validation failed (uuid is expected)', async () => {
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

        it('findOne(id), Should return an error 401, Unauthorized', async () => {
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

        it('findOne(id), should return an error NotFoundException(User not found)', async () => {
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
        it('updateUser(), Should update a user', async () => {
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
        it('updateUser(), should return an error NotFoundException(User not found)', async () => {
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

        it('updateUser(), Should return an error 400 (BadRequest)', async () => {
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

        it('updateUser(), Should return an error 400, Bad Request, property should not exist', async () => {
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
        it('updateUser(), Should update a user', async () => {
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
        it('updateUser(), should return an error NotFoundException(User not found)', async () => {
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
  });
});

// unauthorized en rutas que lo requieran
// admin en rutas que lo requieran
