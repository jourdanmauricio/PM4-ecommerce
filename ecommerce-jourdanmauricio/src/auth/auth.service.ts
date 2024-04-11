import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './auth.dto';
import { CreateUserDto } from 'src/users/user.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/models/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  getAuths() {
    return 'Get all auths?';
  }

  async signin(credentials: LoginUserDto) {
    const user = await this.usersService.signin(credentials);

    const userPayload = {
      sub: user.id,
      id: user.id,
      email: user.email,
      roles: [user.isAdmin ? Role.ADMIN : Role.USER],
    };

    const token = this.jwtService.sign(userPayload);
    return { user, token };
  }

  async signup(user: CreateUserDto) {
    try {
      const hashedPass = await bcrypt.hash(user.password, 10);
      if (!hashedPass)
        throw new BadRequestException('Password could not be hashed');

      return this.usersService.create({ ...user, password: hashedPass });
    } catch (err) {
      throw new BadRequestException('Constraint PK');
    }
  }
}
