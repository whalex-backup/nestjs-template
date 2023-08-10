import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  Transport,
  RedisOptions,
  ClientsProviderAsyncOptions,
  ClientProvider,
  ProducerSerializer,
  RmqOptions,
} from '@nestjs/microservices';
import { RedisMqs } from '../../consts/redis.mqs';
import * as Types from '../../types';
import { RedisOptionConfig } from './redis.mq.config';

// noinspection JSUnusedGlobalSymbols
export default class RedisClientConfig {
  // noinspection DuplicatedCode
  static getConfig(
    configService: ConfigService,
    key: string,
    options?: Types.RedisOptions,
  ): RedisOptions {
    const redisMqs = configService.get<RedisOptionConfig>('redisConfigs');

    // // temporary
    // const redisMqs = {
    //   defiSwap: {
    //     host: 'localhost',
    //     port: 6379,
    //   },
    // };

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

/**
 * @param suffix suffix null 입력시 INV_INFO_RESP
 * @param options RmqOptions
 */
export const defiSwapRedisClientConfig = (
  options?: Types.RedisOptions,
): ClientsProviderAsyncOptions => {
  return {
    name: RedisMqs.DefiSwap,
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService): Promise<ClientProvider> =>
      RedisClientConfig.getConfig(configService, 'defiSwap', options),
    inject: [ConfigService],
  };
};
