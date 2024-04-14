import { Test, TestingModule } from '@nestjs/testing';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
// import typeOrmConfig from './../src/config/typeorm';

import { AppModule } from '../src/app.module';
import { Users } from './../src/entities/users.entity';
import { AuthModule } from './../src/auth/auth.module';
// import { loggerGlobal } from './../src/middlewares/logger.middleware';
import { Reflector } from '@nestjs/core';
import { generateUser } from './../src/faker/user.fake';
import { v4 as uuid } from 'uuid';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const mockUsers = [
    {
      id: '7ef136e4-f80e-4077-818d-1ba72f750aed',
      name: 'Mauricio Jourdan',
      email: 'jourdanmau@mail.com',
      password: '$2b$10$XH0t3k84pQiznk/b0EBA7.mlS6NePpzKeHguJp96zw00B.Wh6Lrse',
      phone: '2214529298',
      country: 'Argentina',
      address: 'Av 7 nro 1532',
      city: 'La Plata',
      isAdmin: true,
    },
    {
      id: 'c4ea2312-f839-4d0b-bb9d-379818fbe74c',
      name: 'Paola Jourdan',
      email: 'jourdanpao@mail.com',
      password: '$2b$10$XH0t3k84pQiznk/b0EBA7.mlS6NePpzKeHguJp96zw00B.Wh6Lrse',
      phone: '2214529298',
      country: 'Argentina',
      address: 'Av 7 nro 1532',
      city: 'La Plata',
      isAdmin: false,
    },
  ];

  const mockUsersRepository = {
    findOneBy: jest
      .fn()
      .mockImplementation((data) =>
        mockUsers.find((el) => el.email === data.email),
      ),
    find: jest.fn().mockImplementation(() => mockUsers),
    findOne: jest.fn().mockImplementation((data) =>
      mockUsers.find((el) => {
        return el.id === data.where.id;
      }),
    ),
    create: jest.fn().mockImplementation((data) => {
      delete data.confPassword;
      return {
        ...data,
        isAdmin: false,
        id: uuid(),
      };
    }),
    save: jest.fn().mockImplementation((data) => {
      mockUsers.push(data);
      return data;
    }),
    merge: jest.fn().mockImplementation((user, changes) => {
      const foundUser = mockUsers.find((el) => {
        return el.id === user.id;
      });
      const index = mockUsers.findIndex((el) => el.id === user.id);
      mockUsers[index] = {
        ...foundUser,
        ...changes,
      };
      return mockUsers[index];
    }),
    delete: jest.fn().mockImplementation((id) => {
      const index = mockUsers.findIndex((item) => item.id === id);

      mockUsers.splice(index, 1);

      return { id };
    }),
  };

  let server = null;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        // ConfigModule.forRoot({
        //   isGlobal: true,
        //   load: [typeOrmConfig],
        // }),
        // TypeOrmModule.forRootAsync({
        //   inject: [ConfigService],
        //   useFactory: (configService: ConfigService) =>
        //     configService.get('typeorm'),
        // }),
        AuthModule,
        AppModule,
        JwtModule.register({
          global: true,
          signOptions: { expiresIn: '1h' },
          secret: process.env.JWT_SECRET,
        }),
      ],
    })
      .overrideProvider(getRepositoryToken(Users))
      .useValue(mockUsersRepository)
      .compile();

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
    server = await app.init();
  });

  afterEach(async () => {
    await server.close();
  });

  let adminAccessToken = null;

  describe('App', () => {
    it('/ (GET health)', async () => {
      return await request(app.getHttpServer())
        .get('/health')
        .expect(200)
        .expect('Server running correctly');
    });
    describe('Auth', () => {
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
          expect(mockUsersRepository.create).toHaveBeenCalled();
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
      describe('GET / ', () => {
        it('findAll(), Should return a list of users', async () => {
          return await request(app.getHttpServer())
            .get('/users')
            .expect('Content-Type', /json/)
            .set({ Authorization: `Bearer ${adminAccessToken}` })
            .expect(200)
            .then((response) => {
              // console.log('******************************************');
              // console.log('All users:', response.body);
              // console.log('******************************************');
              expect(response.body.length).toEqual(mockUsers.length);
              expect(response.body).toEqual(mockUsers);
            });
        });
      });

      describe('GET /:id', () => {
        it('findOne(id), Should return a user', async () => {
          return await request(app.getHttpServer())
            .get('/users/c4ea2312-f839-4d0b-bb9d-379818fbe74c')
            .expect('Content-Type', /json/)
            .set({ Authorization: `Bearer ${adminAccessToken}` })
            .expect(200)
            .then((response) => {
              // console.log('response', response);
              expect(response.body.email).toEqual('jourdanpao@mail.com');
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

      describe('PUT /:id', () => {
        it('updateUser(), Should update a user', async () => {
          return await request(app.getHttpServer())
            .put('/users/c4ea2312-f839-4d0b-bb9d-379818fbe74c')
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

      describe('DELETE /:id', () => {
        it('updateUser(), Should update a user', async () => {
          return await request(app.getHttpServer())
            .delete('/users/c4ea2312-f839-4d0b-bb9d-379818fbe74c')
            .set({ Authorization: `Bearer ${adminAccessToken}` })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
              // console.log('response', response.body);
              expect(response.body.id).toEqual(
                'c4ea2312-f839-4d0b-bb9d-379818fbe74c',
              );
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
