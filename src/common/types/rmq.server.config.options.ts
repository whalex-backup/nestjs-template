import { ConfigService } from '@nestjs/config';
import { RmqOptions } from './rmq.options';

export interface ServerConfigOptions {
  /**
   * ConfigService Class
   */
  configService: ConfigService;
  /**
   * QueueName suffix
   */
  suffix?: string;
  /**
   * Rabbit MQ Config
   */
  options?: RmqOptions;
}
