import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { nanoid } from 'nanoid';
import { RequestContextService } from './app.request.context';

@Injectable()
export class ContextInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const requestId = request?.body?.reqeustId ?? nanoid();

    RequestContextService.setRequestId(requestId);

    return next.handle().pipe(
      tap(() => {
        // empty
      }),
    );
  }
}
