/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

function validateRequest(request: Request) {
  const authHeader = request.header('Authorization');

  if (!authHeader) return false;

  const [type, credentials] = authHeader.split(' ');
  const decodedCredentials = Buffer.from(credentials, 'base64').toString(
    'utf-8',
  );
  const [username, password] = decodedCredentials.split(':');

  if (!username || !password) return false;

  return true;
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
