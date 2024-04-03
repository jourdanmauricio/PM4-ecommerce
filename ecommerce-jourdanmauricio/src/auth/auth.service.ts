import { Injectable } from '@nestjs/common';

import { UsersRespository } from 'src/users/users.repository';
import { SigninDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRespository) {}

  getAuths() {
    return 'Get all auths?';
  }

  signin(credentials: SigninDto) {
    return this.usersRepository.signin(credentials);
  }
}
