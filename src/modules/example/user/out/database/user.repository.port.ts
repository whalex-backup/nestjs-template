import { PaginatedQueryParams, RepositoryPort } from '@common/ddd';
import { UserEntity } from '../../domain/user.entity';

export interface UserRepositoryPort extends RepositoryPort<UserEntity> {}
