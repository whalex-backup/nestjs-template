import { AggregateRoot } from '@common/ddd';
import {
  Mapper,
  Paginated,
  PaginatedQueryParams,
  RepositoryPort,
} from '@common/ddd';
import { Option } from 'oxide.ts';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Logger } from '@nestjs/common';
import { RequestContextService } from '@common/application/context/app.request.context';
import { Repository } from 'typeorm';
import { Entities } from '@common/entities';

export abstract class SqlRepositoryBase<
  Aggregate extends AggregateRoot<any>,
  DbEntity extends Entities,
> implements RepositoryPort<Aggregate>
{
  protected constructor(
    protected readonly repositroy: Repository<DbEntity>,
    protected readonly mapper: Mapper<Aggregate, DbEntity>,
    protected readonly eventEmitter: EventEmitter2,
    protected readonly logger: Logger,
  ) {}

  get tableName() {
    return this.repositroy.metadata.tableName;
  }

  async findOneById(id: string): Promise<Option<Aggregate>> {
    throw new Error('The findOneById method is not implemented');
  }

  async findAll(): Promise<Aggregate[]> {
    const result = await this.repositroy.find();

    return result.map(this.mapper.toDomain);
  }

  async findAllPaginated(
    params: PaginatedQueryParams,
  ): Promise<Paginated<Aggregate>> {
    let field = params.orderBy.field;

    if (field === true) {
      field = '1';
    }

    const result = await this.repositroy
      .createQueryBuilder()
      .offset(params.offset)
      .orderBy(field, params.orderBy.param as 'ASC' | 'DESC')
      .limit(params.limit)
      .getMany();

    const entites = result.map(this.mapper.toDomain);

    return new Paginated({
      data: entites,
      count: result.length,
      limit: params.limit,
      page: params.page,
    });
  }

  async delete(entity: Aggregate): Promise<boolean> {
    throw new Error('The delete method is not implemented');
  }

  async insert(entity: Aggregate | Aggregate[]): Promise<void> {
    const entities = Array.isArray(entity) ? entity : [entity];
    const record = entities.map(this.mapper.toPersistence);

    await this.writeQuery(entity, async () => {
      await this.repositroy
        .createQueryBuilder()
        .insert()
        .into(this.tableName)
        .values(record)
        .execute();
    });
  }

  async writeQuery<T>(
    entity: Aggregate | Aggregate[],
    hanlder: () => Promise<T>,
  ): Promise<T> {
    const entities = Array.isArray(entity) ? entity : [entity];
    entities.forEach((entity) => entity.validate());
    const entityIds = entities.map((e) => e.id);

    this.logger.debug(
      `[${RequestContextService.getRequestId()}] writing ${
        entities.length
      } entities to "${this.tableName}" table: ${entityIds}`,
    );

    const result = await hanlder();

    await Promise.all(
      entities.map((entity) =>
        entity.publishEvents(this.logger, this.eventEmitter),
      ),
    );

    return result;
  }

  async transaction<T>(handler: () => Promise<T>): Promise<T> {
    throw new Error('');
  }
}
