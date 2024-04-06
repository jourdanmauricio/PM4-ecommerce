import { Injectable } from '@nestjs/common';

import { SigninDto } from './auth.dto';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  getAuths() {
    return 'Get all auths?';
  }

  signin(credentials: SigninDto) {
    return this.usersService.signin(credentials);
  }
}
