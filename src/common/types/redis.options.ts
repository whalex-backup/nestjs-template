export interface RedisOptions {
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  cluster?: string;
  retryAttempts?: number;
  retryDelay?: number;
}
