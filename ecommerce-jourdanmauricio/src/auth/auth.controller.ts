import { Body, Controller, Get, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/users/user.dto';
// import { UsersService } from 'src/users/users.service';
// import { LoginUserDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    // private readonly usersService: UsersService,
  ) {}

  @Get()
  getAuths() {
    return this.authService.getAuths();
  }

  @Post('signup')
  createUser(@Body() user: CreateUserDto) {
    return this.authService.signup(user);
  }

  @Post('signin')
  signin(@Body() credentials: LoginUserDto) {
    return this.authService.signin(credentials);
  }
}
