/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { AuthService } from './auth.service';
import { Users } from './../entities/users.entity';
import { UsersService } from './../users/users.service';
import { CreateUserDto } from './../users/user.dto';

describe('AuthService', () => {
  let authService: AuthService;

  const mockUserDto: CreateUserDto = {
    // id: '76ae2f54-dade-49a3-9e7e-da883778cfe8',
    name: 'Mauricio',
    password: '12346578',
    confPassword: '12346578',
    email: 'mauricio@gmail.com',
    isAdmin: false,
    address: 'Diag 74 nro 3530',
    phone: 1158046525,
    city: 'La Plata',
    country: 'Argentina',
  };
  const mockUser: Users = {
    id: '76ae2f54-dade-49a3-9e7e-da883778cfe8',
    name: 'Mauricio',
    password: '12346578',
    email: 'mauricio@gmail.com',
    isAdmin: false,
    address: 'Diag 74 nro 3530',
    phone: 1158046525,
    city: 'La Plata',
    country: 'Argentina',
    orders: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUsersService: Partial<UsersService> = {
    // retornamos undefined porque el usuario no debería existir
    findByEmail: () => Promise.resolve(undefined),
    create: (user: CreateUserDto): Promise<Users> =>
      Promise.resolve({
        ...user,
        id: '76ae2f54-dade-49a3-9e7e-da883778cfe7',
        isAdmin: false,
        country: 'Argentina',
        city: 'La Plata',
        createdAt: new Date(),
        updatedAt: new Date(),
        orders: [],
      }),
  };

  beforeEach(async () => {
    const mockJwtService = {
      sign: (payload) => jwt.sign(payload, 'testSecret'),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('Create an instance of AuthService', async () => {
    expect(authService).toBeDefined();
  });

  it('signup() create a new user with an encrypted password', async () => {
    const user: Users = await authService.signup(mockUserDto);
    // console.log('user', user);
    expect(user).toBeDefined();
    expect(user.password).not.toEqual(mockUser.password);
  });

  it('signUp() throws an error if the email is already in use', async () => {
    // Sobreescribimos la implementación de la fucnión getUserByEmail de mockUserService
    mockUsersService.findByEmail = (email: string) =>
      Promise.resolve(mockUser as Users);

    try {
      await authService.signup(mockUserDto);
    } catch (err) {
      expect(err.message).toEqual('Email is already in use');
    }
  });

  it('signIn() returns an error if the password is invalid', async () => {
    mockUsersService.findByEmail = (email: string) =>
      Promise.resolve(mockUser as Users);

    try {
      await authService.signin({
        email: mockUser.email,
        password: 'INVALID PASSWORD',
      });
    } catch (err) {
      expect(err.message).toEqual('Invalid credenttials');
    }
  });

  it('signIn() returns an error if the user is not found', async () => {
    try {
      await authService.signin({
        email: mockUser.email,
        password: mockUser.password,
      });
    } catch (err) {
      expect(err.message).toEqual('Invalid credenttials');
    }
  });

  it('signIn() returns an object with a message and a token if the user is found and the password is valid', async () => {
    const moskUserVariant = {
      ...mockUser,
      password: await bcrypt.hash(mockUser.password, 10),
    };

    mockUsersService.findByEmail = (email: string) =>
      Promise.resolve(moskUserVariant as Users);

    const response = await authService.signin({
      email: mockUser.email,
      password: mockUser.password,
    });

    expect(response).toBeDefined();
  });
});
