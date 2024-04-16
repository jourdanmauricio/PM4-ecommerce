import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from './../users/users.service';
import { LoginUserDto } from '../users/user.dto';
import { CreateUserDto } from './../users/user.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from './../models/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signin(credentials: LoginUserDto) {
    const { email, password } = credentials;

    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credenttials');

    const matchPass = await bcrypt.compare(password, user.password);

    if (!matchPass) throw new UnauthorizedException('Invalid credenttials');

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
    const dbUser = await this.usersService.findByEmail(user.email);
    if (dbUser) throw new BadRequestException('Email is already in use');

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
