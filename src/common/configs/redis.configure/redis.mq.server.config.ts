import { ConfigService } from '@nestjs/config';
import { Transport, RedisOptions } from '@nestjs/microservices';
import * as Types from '../../types';
import { RedisOptionConfig } from './redis.mq.config';

export default class RedisServerConfig {
  // noinspection DuplicatedCode
  static getConfig(
    configService: ConfigService,
    key: string,
    options?: Types.RedisOptions,
  ): RedisOptions {
    const redisMqs = configService.get<RedisOptionConfig>('redisConfigs');

    if (!redisMqs) {
      throw new Error(`redisMqs 을 찾을 수 없습니다`);
    }

    return {
      transport: Transport.REDIS,
      options: {
        host: redisMqs.host,
        port: Number(redisMqs.port),
        ...options,
      },
    };
  }
}

// noinspection JSUnusedGlobalSymbols
/**
 * defi-swap redis mq client 환경변수
 * @param configService NetsJS ConfigService
 * @param options RedisOptions
 */
export const defiSwapRedisServerConfig = (
  configService: ConfigService,
  options?: Types.RedisOptions,
): RedisOptions => {
  return RedisServerConfig.getConfig(configService, 'defiSwap', options);
};
