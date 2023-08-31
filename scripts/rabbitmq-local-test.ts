import { log } from './script-util';
import * as amqplib from 'amqplib';
import * as readline from 'readline';

const exchangeName = 'koo.direct'
const routingKey = 'koo_routing_key'
const queueName1 = 'koo.queue.1';
const queueName2 = 'koo.queue.2';

let connection: amqplib.Connection;
let channel: amqplib.Channel;

const consuming = async () => {
  connection = await amqplib.connect(
    'amqp://nestjs-template:nestjs-template@127.0.0.1:5672/%2F',
  );

  // sender channel
  channel = await connection.createChannel();
  await channel.assertQueue(queueName1);
  channel.consume(
    queueName1,
    (msg) => {
      if (msg) {
        log(`${queueName1} - channel1 echo: ${msg.content.toString()}`);
      } else {
        log(`Error! : ${msg}`);
      }
    },
    {
      noAck: true,
    },
  );

  // noAck: false
  const channel2 = await connection.createChannel();
  await channel2.assertQueue(queueName1);
  channel2.consume(
    queueName1,
    (msg) => {
      if (msg) {
        log(`${queueName1} - channel2 echo: ${msg.content.toString()}`);
        channel2.ack(msg);
      } else {
        log(`Error! : ${msg}`);
      }
    },
    {
      noAck: false,
    },
  );

  // noAck: false
  const channel3 = await connection.createChannel();
  await channel3.assertQueue(queueName2);
  channel3.consume(
    queueName2,
    (msg) => {
      if (msg) {
        log(`${queueName2} - channel3 echo: ${msg.content.toString()}`);
      } else {
        log(`Error! : ${msg}`);
      }
    },
    {
      noAck: true,
    },
  );
};

const sendMessage = (channel: amqplib.Channel) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('\nType the message (exit: [q]):\n', (answer) => {
    if (answer === 'q') {
      process.exit(1);
    }

    channel.publish(exchangeName, routingKey, Buffer.from(answer));
    rl.close();

    setTimeout(() => {
      sendMessage(channel);
    }, 500);
  });
};

const main = async () => {
  log('\nstart consuming.');
  await consuming();
  sendMessage(await connection.createChannel());

  // for stress testing
  // setInterval(() => {
  //   channel.publish(exchangeName, routingKey,Buffer.from('queue aliving...'))
  // }, 100)
};

main().then();
