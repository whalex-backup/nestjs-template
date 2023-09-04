import http from 'k6/http';
import Amqp from 'k6/x/amqp';
import Queue from 'k6/x/amqp/queue';

import { check, sleep } from 'k6';
import { Options } from 'k6/options';

// Test configuration
export const options: Options = {
  thresholds: {
    // Assert that 99% of requests finish within 3000ms.
    http_req_duration: ['p(99) < 3000'],
  },
  stages: [
    { duration: '30s', target: 15 },
    { duration: '1m', target: 15 },
    { duration: '20s', target: 0 },
  ],
};

const username = 'mq-admin';
const password = 'jt*pr2vGB8@ZNmzBXRqx';

// Simulated user behavior
export default () => {
  const url = `amqps://${username}:${password}@common-mq.dev-test.gdac.com:5671/defi`;

  Amqp.start({
    connection_url: url,
  });

  const queueName = 'LEDGER_SWAP_REQ';

  Queue.declare({
    name: queueName,
    durable: true,
  });

  console.log(`${queueName} is ready`);

  Amqp.publish({
    queue_name: queueName,
    body: JSON.stringify({
      pattern: 'ROQ:SWAP',
      data: {
        t_id: '11112220011',
        session_id: '900',
        user_id: '10102860', // Koo
        order_id: '2308160000000000006',
        slippage: '5',
        fee_asset: 'ETH',
        fee_krw: '2000000',
        fee: '0.0001',
        from_asset: '1INCH',
        to_asset: 'ETH',
        from_amount_krw: '10000',
        from_amount: '0.5',
        to_amount_krw: '11231',
        to_amount: '1000000',
        req_dtime: '2023-06-23T00:08:09',
      },
    }),
    content_type: 'text/plain',
  });

  const listener = (data) => {
    console.log(`received data: ` + data);
  };

  const resQueueName = 'LEDGER_SWAP_RES';

  Amqp.listen({
    queue_name: resQueueName,
    listener: listener,
  });

  sleep(1);
};
