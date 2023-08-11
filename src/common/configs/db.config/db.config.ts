import { Expose, plainToInstance, Transform } from 'class-transformer';
import { DbConnection } from './db.connection';

export class DbConfig {
  /**
   * cstdDatabase
   */
  @Transform(
    (params) => {
      return plainToInstance(DbConnection, params.value);
    },
    { toClassOnly: true },
  )
  @Expose({
    name: 'cstd_database',
  })
  cstd?: DbConnection;
  @Transform(
    (params) => {
      return plainToInstance(DbConnection, params.value);
    },
    { toClassOnly: true },
  )
  @Expose({
    name: 'cstd_readonly_database',
  })
  cstdReadOnly?: DbConnection;
  /**
   * whalexDatabase
   */
  @Transform(
    (params) => {
      return plainToInstance(DbConnection, params.value);
    },
    { toClassOnly: true },
  )
  @Expose({
    name: 'whalex_database',
  })
  whalex?: DbConnection;

  /**
   * whalexDatabase
   */
  @Transform(
    (params) => {
      return plainToInstance(DbConnection, params.value);
    },
    { toClassOnly: true },
  )
  @Expose({
    name: 'defi',
  })
  localhost?: DbConnection;
}
