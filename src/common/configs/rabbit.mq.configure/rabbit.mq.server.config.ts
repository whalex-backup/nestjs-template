import { ConfigService } from '@nestjs/config';
import { Transport, RmqOptions } from '@nestjs/microservices';
import { RabbitMqConfig } from './rabbit.mq.config';
import * as Types from '@src/common/types';
import { Logger } from '@nestjs/common';

// noinspection JSUnusedGlobalSymbols
export default class RabbitMqServerConfig {
  private static logger: Logger = new Logger('RabbitMqServerConfig');

  // noinspection DuplicatedCode
  static getConfig(
    configService: ConfigService,
    key: string,
    suffix?: string,
    options?: Types.RmqOptions,
  ): RmqOptions {
    const rabbitMqs = configService.get<RabbitMqConfig>('rabbitMqs') ?? {};
    let connection = rabbitMqs[key];

    if (!connection) {
      this.logger.error(`RabbitMqServerConfig: ${key}를 찾을 수 없습니다`);
      connection = {
        urls: [
          'amqps://defi-ledger-swap:Yj-8@i@CNnA!ytcHVD!a@common-mq.dev-test.gdac.com:5671/defi',
        ],
        queueName: 'LEDGER_SWAP',
      };
    }

    if (!suffix) {
      suffix = '_REQ';
    }

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

// noinspection JSUnusedGlobalSymbols
/**
 * ledger-swap rabbit mq client 환경변수
 * @param configService NetsJS ConfigService
 * @param suffix suffix null 입력시 INV_INFO_REQ
 * @param options RmqOptions
 */
export const defiRequsetOrderRabbitMqServerConfig = (
  configService: ConfigService,
  suffix?: string,
  options?: Types.RmqOptions,
): RmqOptions => {
  return RabbitMqServerConfig.getConfig(
    configService,
    'defiLedgerSwap',
    suffix,
    options,
  );
};

// noinspection JSUnusedGlobalSymbols
/**
 * ledger-swap rabbit mq client 환경변수
 * @param configService NetsJS ConfigService
 * @param suffix suffix null 입력시 INV_INFO_REQ
 * @param options RmqOptions
 */
export const defiSwapTransactionRabbitMqServerConfig = (
  configService: ConfigService,
  suffix?: string,
  options?: Types.RmqOptions,
): RmqOptions => {
  return RabbitMqServerConfig.getConfig(
    configService,
    'defiLedgerWallet',
    suffix,
    options,
  );
};
