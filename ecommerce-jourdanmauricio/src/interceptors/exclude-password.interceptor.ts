import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExcludePasswordInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        const dataCopy = JSON.parse(JSON.stringify(data));
        if (Array.isArray(data)) {
          dataCopy.forEach((user) => {
            delete user.password;
          });
          return dataCopy;
        } else if (!Array.isArray(data) && typeof data === 'object') {
          delete dataCopy.password;
          return dataCopy;
        }
        return data;
      }),
    );
  }
}
