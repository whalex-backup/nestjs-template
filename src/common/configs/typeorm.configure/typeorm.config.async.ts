import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Logger } from 'winston';
import { LoggerOptions as TypeOrmLoggerOptions } from 'typeorm/logger/LoggerOptions';
import { TypeOrmConfig } from './typeorm.config';
import { EntityList } from '@src/common/entities';

/**
 * @description TypeORM 환경설정
 * @param logger winston logger
 * @param loggerOption logger options
 */
export const TypeOrmConfigAsync = (
  logger?: Logger,
  loggerOption?: TypeOrmLoggerOptions,
): TypeOrmModuleAsyncOptions => {
  return {
    imports: [ConfigModule],
    useFactory: async (
      configService: ConfigService,
    ): Promise<TypeOrmModuleOptions> => {
      const typeOrmConfig = new TypeOrmConfig();

      const config = typeOrmConfig.getOrmConfig({
        configService,
        logger,
        loggerOption,
        entities: EntityList,
        key: 'whalex',
      });

      return config;
    },
    inject: [ConfigService],
  };
};
