import { Expose } from 'class-transformer';

export class RedisConfig {
  /**
   * host
   */
  @Expose({
    name: 'host',
  })
  host: string;
  /**
   * port
   */
  @Expose({
    name: 'port',
  })
  port: number;
}
