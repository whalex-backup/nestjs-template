import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  Transport,
  ClientProvider,
  ClientsProviderAsyncOptions,
  ProducerSerializer,
} from '@nestjs/microservices';
import { RabbitMqConfig } from './rabbit.mq.config';
import { RabbitMqs } from '@src/common/consts/rabbit.mqs';
import { RmqOptions } from '@src/common/types';

// noinspection JSUnusedGlobalSymbols
export default class RabbitMqClientConfig {
  // noinspection DuplicatedCode
  static async getConfig(
    configService: ConfigService,
    key: string,
    suffix?: string,
    options?: RmqOptions,
    serializer?: ProducerSerializer,
  ): Promise<ClientProvider> {
    const rabbitMqs = configService.get<RabbitMqConfig>('rabbitMqs') ?? {};

    const connection = rabbitMqs[key];

    if (!connection) {
      throw new Error(`${key}를 찾을 수 없습니다`);
    }

    if (!suffix) {
      suffix = '_RESP';
    }

    if (serializer) {
      return {
        transport: Transport.RMQ,
        options: {
          serializer,
          urls: connection.urls,
          queue: `${connection.queueName}${suffix}`,
          ...options,
        },
      };
    } else {
      return {
        transport: Transport.RMQ,
        options: {
          urls: connection.urls,
          queue: `${connection.queueName}${suffix}`,
          ...options,
        },
      };
    }
  }
}

// noinspection JSUnusedGlobalSymbols
/**
 * ledger-swap rabbit mq client 환경변수
 * @param suffix suffix null 입력시 INV_INFO_RESP
 * @param options RmqOptions
 */
export const defiRequestOrderRabbitMqClientConfig = (
  suffix?: string,
  options?: RmqOptions,
): ClientsProviderAsyncOptions => {
  return {
    name: RabbitMqs.DefiRequestOrder,
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService): Promise<ClientProvider> =>
      RabbitMqClientConfig.getConfig(
        configService,
        'defiLedgerSwap',
        suffix,
        options,
      ),
    inject: [ConfigService],
  };
};
