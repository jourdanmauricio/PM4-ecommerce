import { Injectable } from '@nestjs/common';
import { UsersRespository } from './users.repository';
import { CreateUserDto, UpdateUserDto, User } from './user.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRespository) {}
  getUsers() {
    return this.usersRepository.getUsers();
  }

  getUserById(id: number): Promise<User> {
    return this.usersRepository.getById(id);
  }
  createUser(user: CreateUserDto): Promise<User> {
    return this.usersRepository.createUser(user);
  }

  updateUser(id: number, changes: UpdateUserDto) {
    return this.usersRepository.updateUser(id, changes);
  }

  deleteUser(id: number) {
    return this.usersRepository.deleteUser(id);
  }
}
