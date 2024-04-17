/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { APP_PIPE } from '@nestjs/core';
import { ParseUUIDPipe } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { generateUser, generateUsers } from '../data/user.fake';
import { UUID } from 'crypto';

describe('UsersController', () => {
  let controller: UsersController;

  const fakeUsers = generateUsers(5);
  const fakeUser = generateUser();

  const mockUsersService = {
    findAll: jest.fn().mockImplementation(() => ({ users: fakeUsers })),
    update: jest.fn((id, dto) => ({
      ...fakeUser,
      ...dto,
    })),
    findOne: jest.fn((id) => fakeUser),
    remove: jest.fn((id) => fakeUsers[0]),
  };

  beforeEach(async () => {
    // Creamos un module simulando users.module
    // users.module posee una dependencia (private readonly usersService: UsersService)
    // Jest no resulve la dependencia
    // En este caso no queremos realizar la implementación de usersService
    // Crearemos un mock de usersService que simula la dependencia
    // sobreescribimos el provider por el  mockUsersService
    // por el momento tambien mockeamos JwtService

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        JwtService,
        {
          provide: APP_PIPE,
          useClass: ParseUUIDPipe,
        },
      ],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should return a list of users', async () => {
    const response = await controller.getUsers(1, 5);
    // console.log('Users', response);
    expect(response.users.length).toEqual(fakeUsers.length);
    expect(response.users).toEqual(fakeUsers);
    expect(mockUsersService.findAll).toHaveBeenCalled();
  });

  it('Should return a user', async () => {
    const user = await controller.getUserById(fakeUser.id as UUID);
    // console.log('User', controller.getUserById(fakeUser.id);

    expect(user).toEqual(fakeUser);
    expect(mockUsersService.findOne).toHaveBeenCalled();
  });

  it('Should update a user', async () => {
    const dto = { name: 'Mauricio' };
    const updUser = await controller.updateUser(fakeUser.id as UUID, dto);
    // console.log('update user', updUser);
    expect(updUser).toEqual({
      ...fakeUser,
      ...dto,
    });
    expect(mockUsersService.update).toHaveBeenCalledWith(fakeUser.id, dto);
  });

  it('Should delete a user', async () => {
    const delUser = await controller.deleteUser(fakeUsers[0].id);
    // console.log('delete user', delUser);
    expect(delUser).toEqual(fakeUsers[0]);
    expect(mockUsersService.remove).toHaveBeenCalledWith(fakeUsers[0].id);
  });
});
