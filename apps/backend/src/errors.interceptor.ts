import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException
} from '@nestjs/common';
import { Observable, of, from, throwError } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { nullOrUndefined } from './utils';

export interface Response<T> {
  data: T;
}

function notFoundIfNullOrUndefined(x: any) {
  if (nullOrUndefined(x)) {
    return throwError(new HttpException('Not found', 404));
  } else {
    return of(x);
  }
}

@Injectable()
export class ErrorsInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(flatMap(notFoundIfNullOrUndefined));
  }
}
