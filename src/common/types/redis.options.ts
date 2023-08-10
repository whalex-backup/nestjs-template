export interface RedisOptions {
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  cluster?: string;
  engine?: string;
  reader?: string;
  retryAttempts?: number;
  retryDelay?: number;
}
