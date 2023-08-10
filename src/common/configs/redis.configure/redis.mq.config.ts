import { Expose, plainToInstance, Transform } from 'class-transformer';

export class RedisOptionConfig {
  @Expose({
    name: 'username',
  })
  username: string;

  @Expose({
    name: 'password',
  })
  password: string;

  @Expose({
    name: 'engine',
  })
  engine: string;

  @Expose({
    name: 'host',
  })
  host: string;

  @Expose({
    name: 'reader',
  })
  reader: string;

  @Expose({
    name: 'port',
  })
  port: string;

  @Expose({
    name: 'cluster',
  })
  cluster: string;
}
