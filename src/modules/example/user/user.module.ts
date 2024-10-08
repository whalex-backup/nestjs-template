import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRepository } from './out/database/user.repository';
import { CreateUserHttpController } from './commands/create-user/create-user.http.controller';
import { CreateUserService } from './commands/create-user/create-user.service';
import { UserMapper } from './user.mapper';
import { USER_REPOSITORY } from './user.di-tokens';
import { ClientsModule } from '@nestjs/microservices';
import { defiRequestOrderRabbitMqClientConfig } from '@src/common/configs/rabbit.mq.configure/rabbit.mq.client.config';

const httpControllers = [CreateUserHttpController];

const commandHandlers: Provider[] = [CreateUserService];

const mappers: Provider[] = [UserMapper];

const repositories: Provider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepository },
];

@Module({
  imports: [
    CqrsModule,
    ClientsModule.registerAsync([
      defiRequestOrderRabbitMqClientConfig('_REQ', {
        noAck: true,
        queueOptions: {
          durable: true,
        },
      }),
    ]),
  ],
  controllers: [...httpControllers],
  providers: [Logger, ...repositories, ...commandHandlers, ...mappers],
})
export class UserModule {}
