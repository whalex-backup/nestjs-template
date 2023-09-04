declare module 'k6/x/amqp' {
  export default class Amqp {
    static start(params: { connection_url: string }) {}
    static publish(params: {
      queue_name: string;
      body: any;
      content_type: 'text/plain';
      timestamp?: number = Math.round(Date.now() / 1000);
      exchange?: string = '';
      mandatory?: boolean = false;
      immediate?: boolean = false;
      headers?: Record<string, string>;
    });
    static listen(params: {
      queue_name: string;
      listener: (data: any) => void;
      consumer?: (data: any) => void;
      auto_ack?: booelean = true;
      exclusive?: boolean = false;
      no_local?: boolean = false;
      no_wait?: boolean = false;
      args?: any | null = null;
    });
  }
}

declare module 'k6/x/amqp/queue' {
  export default class Queue {
    static declare(params: {
      name: string;
      durable?: boolean = false;
      delete_when_unused?: boolean = false;
      exclusive?: boolean = false;
      no_wait?: boolean = false;
      args?: any | null = null;
    });
  }
}
