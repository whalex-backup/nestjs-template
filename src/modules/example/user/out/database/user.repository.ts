import { Injectable, Logger } from '@nestjs/common';
import { User } from '@common/entities/User';
import { UserEntity } from '@modules/example/user/domain/user.entity';
import { UserRepositoryPort } from './user.repository.port';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SqlRepositoryBase } from '@common/db/sql-repositry.base';
import { UserMapper } from '@modules/example/user/user.mapper';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UserRepository
  extends SqlRepositoryBase<UserEntity, User>
  implements UserRepositoryPort
{
  constructor(
    @InjectRepository(User)
    whalexBalanceSwapRepo: Repository<User>,
    mapper: UserMapper,
    eventEmitter: EventEmitter2,
  ) {
    super(
      whalexBalanceSwapRepo,
      mapper,
      eventEmitter,
      new Logger(UserRepository.name),
    );
  }
}
