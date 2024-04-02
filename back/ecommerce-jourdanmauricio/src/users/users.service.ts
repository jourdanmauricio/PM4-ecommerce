import { Injectable } from '@nestjs/common';
import { UsersRespository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRespository) {}
  getUsers() {
    return this.usersRepository.getUsers();
  }
}
