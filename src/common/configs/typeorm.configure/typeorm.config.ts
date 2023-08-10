import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Logger } from 'winston';
import { WinstonAdaptor } from 'typeorm-logger-adaptor/logger/winston';
import { LoggerOptions as TypeOrmLoggerOptions } from 'typeorm/logger/LoggerOptions';
import { EntitySchema } from 'typeorm';
import { DbConfig } from '@common/configs/db.config/db.config';
import { DbConnection } from '../db.config/db.connection';

export class TypeOrmConfig {
  private readonly DB_TYPES = {
    MYSQL: 'mysql',
  };

  private readonly TIMZONES = {
    UTC: '+00:00',
    KST: '+09:00',
  };

  async getOrmConfig({
    configService,
    entities,
    key,
    logger,
    loggerOption,
  }: {
    configService: ConfigService;
    // eslint-disable-next-line @typescript-eslint/ban-types
    entities: (Function | string | EntitySchema<any>)[];
    key?: string;
    logger?: Logger;
    loggerOption?: TypeOrmLoggerOptions;
  }): Promise<TypeOrmModuleOptions> {
    const dbConfigs = configService.get<DbConfig>('dbConfigs');
    const isLocalhost = !!dbConfigs?.localhost;
    const fiveSeconds = 1000 * 5;

    const defaultConfig = {
      type: this.DB_TYPES.MYSQL,
      connectTimeout: fiveSeconds,
      retryAttempts: 2,
      synchronize: false,
      logging: false,
      timezone: this.TIMZONES.UTC,
      entities,
    };

    let connection: DbConfig | DbConnection;

    if (!isLocalhost) {
      if (key) connection = dbConfigs[key];
      else connection = dbConfigs;
    } else {
      connection = dbConfigs.localhost;
    }

    if (!connection) {
      throw new Error('Cannot find database connection information');
    }

    if (logger) {
      defaultConfig['logger'] = new WinstonAdaptor(
        logger,
        loggerOption || 'all',
      );
    }

    const config = Object.assign(defaultConfig, {
      ...connection,
    }) as TypeOrmModuleOptions;

    return config;
  }
}
