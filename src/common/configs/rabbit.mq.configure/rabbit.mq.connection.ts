import { Expose } from 'class-transformer';

export class RabbitMqConnection {
  /**
   * 기본 접속 정보
   */
  @Expose({
    name: 'urls',
  })
  urls: string[];
  /**
   * 기본 접속 정보
   */
  @Expose({
    name: 'queue_name',
  })
  queueName: string;
}
