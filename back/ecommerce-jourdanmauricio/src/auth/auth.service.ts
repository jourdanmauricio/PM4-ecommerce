import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getAuths() {
    return 'Get all auths?';
  }
}
