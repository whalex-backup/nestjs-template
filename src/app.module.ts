import { Module, Provider } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { ContextInterceptor } from './common/application/context/context.interceptor';
import { ExceptionInterceptor } from './common/application/interceptors/exception.interceptor';
import { EventEmitterModule } from '@nestjs/event-emitter';

const interceptors: Provider[] = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ContextInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ExceptionInterceptor,
  },
];

@Module({
  imports: [EventEmitterModule, CqrsModule],
  controllers: [],
  providers: [...interceptors],
})
export class AppModule {}
