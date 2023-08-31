import { log } from './script-util';
import * as amqplib from 'amqplib';
import * as readline from 'readline';

const queueName = 'koo.queue';
let connection: amqplib.Connection;
let channel: amqplib.Channel;

const consuming = async () => {
  connection = await amqplib.connect(
    'amqp://nestjs-template:nestjs-template@127.0.0.1:5672/%2F',
  );

  // noAck: true
  channel = await connection.createChannel();
  await channel.assertQueue(queueName);
  channel.consume(
    queueName,
    (msg) => {
      if (msg) {
        log(`channel echo: ${msg.content.toString()}`);
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
  await channel2.assertQueue(queueName);
  channel2.consume(
    queueName,
    (msg) => {
      if (msg) {
        log(`channel2 echo: ${msg.content.toString()}`);
        channel2.ack(msg);
      } else {
        log(`Error! : ${msg}`);
      }
    },
    {
      noAck: false,
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

    channel.sendToQueue(queueName, Buffer.from(answer));
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
};

main().then();
