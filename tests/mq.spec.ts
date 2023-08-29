import client, { Channel, Connection } from 'amqplib';

const username = process.env.MQ_USERNAME || 'mq-admin';
const password = process.env.MQ_PASSWORD || 'jt*pr2vGB8@ZNmzBXRqx';
const queueName = 'ROQ:SWAP';

describe('/test/send-swap', () => {
  let connection: Connection;
  let channel: Channel;

  beforeAll(async () => {
    connection = await client.connect(
      `amqps://${username}:${password}@common-mq.dev-test.gdac.com:5671/defi`,
    );

    expect(connection).not.toBeNull();
    channel = await connection.createChannel();
    await channel.assertQueue('LEDGER_SWAP_REQ');
  });

  afterAll(async () => {
    await channel.close();
    await connection.close();
  });

  it('simple', async () => {
    channel.on('testEvent', (v) => {
      expect(v).toBe('hello');
    });

    const result = await channel.publish(
      'swap.direct', // exchange
      'direct', // routing key
      Buffer.from(
        JSON.stringify({
          pattern: queueName,
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
      ),
    );

    expect(result).toBe(true);
  });
});
