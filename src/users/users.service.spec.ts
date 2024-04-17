/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Users } from './../entities/users.entity';
import { UsersService } from './users.service';
import { generateUser, generateUsers } from '../data/user.fake';

describe('UsersService', () => {
  let service: UsersService;

  const fakeUsers = generateUsers(5);

  const mockUsersRepository = {
    findAndCount: jest.fn().mockImplementation((params) => {
      return [fakeUsers, params.limit];
    }),
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((user) =>
        Promise.resolve({ id: Date.now(), ...user }),
      ),
    findOne: jest.fn((id) => fakeUsers[0]),
    findOneBy: jest.fn((email) => fakeUsers[0]),
    merge: jest.fn((id, dto) => {
      return {
        ...fakeUsers[0],
        ...dto,
      };
    }),
    delete: jest.fn((id, dto) => fakeUsers[0]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('User findAll', () => {
    it('Should return a list of users', async () => {
      const response = await service.findAll(1, 5);
      // console.log('Users', controller.getUsers());
      expect(response.users.length).toEqual(fakeUsers.length);
      expect(response.users).toEqual(fakeUsers);
      expect(mockUsersRepository.findAndCount).toHaveBeenCalled();
    });
  });

  describe('User findOne(id)', () => {
    it('findOne(id), Should return a user', async () => {
      const user = await service.findOne(fakeUsers[0].id);
      // console.log('User', service.findOne(fakeUser[0].id);

      expect(user).toEqual(fakeUsers[0]);
      expect(mockUsersRepository.findOne).toHaveBeenCalled();
    });

    it('findOne(id), should return an error NotFoundException(User not found)', async () => {
      mockUsersRepository.findOne = jest.fn((id) => undefined);
      const dto = { name: 'Mauricio', password: '12345678' };

      try {
        const user = await service.findOne(fakeUsers[0].id);
      } catch (err) {
        expect(err.message).toEqual('User not found');
      }
    });

    it('Should return a user by email', async () => {
      const user = await service.findByEmail(fakeUsers[0].email);
      // console.log('User', service.findOne(fakeUser[0].id);

      expect(user).toEqual(fakeUsers[0]);
      expect(mockUsersRepository.findOne).toHaveBeenCalled();
    });
  });

  describe('User Create', () => {
    it('Should create a new user and return that ', async () => {
      const mockUser = generateUser();
      delete mockUser.id;

      const newUser = await service.create({
        ...mockUser,
        password: '12345678',
        confPassword: '12345678',
        isAdmin: false,
      });

      expect(newUser).toEqual({ id: expect.any(Number), ...newUser });
      expect(mockUsersRepository.create).toHaveBeenCalledWith({
        ...mockUser,
        password: '12345678',
        confPassword: '12345678',
        isAdmin: false,
      });
    });
  });

  describe('User Update()', () => {
    it('Should update a user', async () => {
      mockUsersRepository.findOne = jest.fn((id) => fakeUsers[0]);
      const dto = { name: 'Mauricio' };
      const updUser = await service.update(fakeUsers[0].id, dto);

      expect(updUser).toEqual({
        ...fakeUsers[0],
        ...dto,
      });
      expect(mockUsersRepository.merge).toHaveBeenCalledWith(fakeUsers[0], dto);
      expect(mockUsersRepository.save).toHaveBeenCalledWith({
        ...fakeUsers[0],
        ...dto,
      });
    });

    it('Should modify the user and encrypt the new password', async () => {
      const dto = { name: 'Mauricio', password: '12345678' };
      const updUser = await service.update(fakeUsers[0].id, dto);
      expect(updUser.password).not.toEqual(fakeUsers[0].password);
    });

    it('update(), should return an error NotFoundException(User not found)', async () => {
      mockUsersRepository.findOne = jest.fn((id) => undefined);
      const dto = { name: 'Mauricio', password: '12345678' };

      try {
        const updUser = await service.update(fakeUsers[0].id, dto);
      } catch (err) {
        expect(err.message).toEqual('User not found');
      }
    });
  });

  describe('User remove()', () => {
    it('Should delete a user', async () => {
      mockUsersRepository.findOne = jest.fn((id) => fakeUsers[0]);
      const delUser = await service.remove(fakeUsers[0].id);
      // console.log('delete user', delUser);
      expect(delUser).toEqual(fakeUsers[0]);
      expect(mockUsersRepository.delete).toHaveBeenCalledWith(fakeUsers[0].id);
    });
  });
});
