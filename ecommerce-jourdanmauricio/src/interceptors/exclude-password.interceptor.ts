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
        if (Array.isArray(data)) {
          const dataCopy = JSON.parse(JSON.stringify(data));
          dataCopy.forEach((user) => {
            if (user && typeof user === 'object') {
              delete user.password;
              this.excludePasswordFromNestedObjects(user);
            }
          });
          return dataCopy;
        } else if (!Array.isArray(data) && typeof data === 'object') {
          const dataCopy = JSON.parse(JSON.stringify(data));
          delete dataCopy.password;
          this.excludePasswordFromNestedObjects(dataCopy);
          return dataCopy;
        }
        return data;
      }),
    );
  }

  private excludePasswordFromNestedObjects(data: any) {
    for (const key in data) {
      if (data.hasOwnProperty(key) && typeof data[key] === 'object') {
        this.excludePasswordFromNestedObjects(data[key]);
      }
    }
  }
}
