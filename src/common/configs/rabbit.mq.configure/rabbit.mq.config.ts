import { Expose, plainToInstance, Transform } from 'class-transformer';
import { RabbitMqConnection } from './rabbit.mq.connection';

export class RabbitMqConfig {
  /**
   * defiLedgerSwap
   */
  @Transform(
    (params) => {
      return plainToInstance(RabbitMqConnection, params.value);
    },
    { toClassOnly: true },
  )
  @Expose({
    name: 'defi-ledger-swap',
  })
  defiLedgerSwap: RabbitMqConnection;

  /**
   * defiLedgerWallet
   */
  @Transform(
    (params) => {
      return plainToInstance(RabbitMqConnection, params.value);
    },
    { toClassOnly: true },
  )
  @Expose({
    name: 'defi-ledger-wallet',
  })
  defiLedgerWallet: RabbitMqConnection;
}
