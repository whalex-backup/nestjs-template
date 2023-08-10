import { Expose } from 'class-transformer';

export class DbConnection {
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
  /**
   * username
   */
  @Expose({
    name: 'username',
  })
  username: string;
  /**
   * password
   */
  @Expose({
    name: 'password',
  })
  password: string;
  /**
   * database
   */
  @Expose({
    name: 'database',
  })
  database: string;
}
