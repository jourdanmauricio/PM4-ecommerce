import { Injectable } from '@nestjs/common';

import { LoginUserDto } from './auth.dto';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  getAuths() {
    return 'Get all auths?';
  }

  signin(credentials: LoginUserDto) {
    return this.usersService.signin(credentials);
  }
}
