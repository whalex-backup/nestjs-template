export interface RmqOptions {
  prefetchCount?: number;
  isGlobalPrefetchCount?: boolean;
  queueOptions?: any;
  socketOptions?: any;
  noAck?: boolean;
  replyQueue?: string;
  persistent?: boolean;
  headers?: Record<string, string>;
}
