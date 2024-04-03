import { Body, Controller, Get, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SigninDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuths() {
    return this.authService.getAuths();
  }
  @Post('signin')
  signin(@Body() credentials: SigninDto) {
    return this.authService.signin(credentials);
  }
}
