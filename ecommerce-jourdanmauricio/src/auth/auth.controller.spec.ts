/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Users } from './../entities/users.entity';
import { CreateUserDto } from './../users/user.dto';
import { LoginUserDto } from './../users/user.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let mockAuthService: Partial<AuthService>;

  const mockUserDto: Omit<CreateUserDto, 'isAdmin'> = {
    name: 'Mauricio Jourdan3',
    email: 'jourdanmau12@mail.com',
    password: 'Aa$12345678',
    confPassword: 'Aa$12345678',
    phone: 2214529298,
    address: 'Av 7 nro 1532',
    city: 'La Plata',
    country: 'Argentina',
  };

  const mockUser = {
    id: '8a541953-381a-4baa-b8b7-14b8f4dc48d4',
    ...mockUserDto,
    orders: [],
    createdAt: new Date('01/01/2024'),
    updatedAt: new Date('01/01/2024'),
    isAdmin: false,
  };

  beforeEach(async () => {
    mockAuthService = {
      signup: (mockUserDto: CreateUserDto) =>
        Promise.resolve({
          ...mockUserDto,
          id: '8a541953-381a-4baa-b8b7-14b8f4dc48d4',
          orders: [],
          createdAt: new Date('01/01/2024'),
          updatedAt: new Date('01/01/2024'),
          isAdmin: false,
        } as Users),
      signin: (user: LoginUserDto) =>
        Promise.resolve({
          user: {
            ...mockUser,
          },
          token: '123456789-12346589-123456789',
        } as { user: Users; token: string }),
    };

    //

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });
  it('Should be defined', async () => {
    expect(authController).toBeDefined();
  });

  // signin
  it('signin() should return an user with token', async () => {
    const user = await authController.signin({
      email: 'jourdanmau12@mail.com',
      password: '12346787',
    });

    expect(user).toEqual({
      user: mockUser,
      token: '123456789-12346589-123456789',
    });
  });
  // signup
  it('signup() should return a new user without password', async () => {
    const user = await authController.signup({
      ...mockUserDto,
      isAdmin: false,
    });

    expect(user).toEqual(mockUser);
  });
});
