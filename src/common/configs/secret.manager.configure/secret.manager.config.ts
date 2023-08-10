import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { RedisOptions } from '@src/common/types';
import { plainToInstance } from 'class-transformer';
import { DbConfig } from '../db.config/db.config';
import { RedisConfig } from '../redis.configure/redis.config';

let dbConfig: DbConfig;
let redisConfig: RedisConfig;

const loadSecretManager = async (secretId: string) => {
  const client = new SecretsManagerClient({
    region: process.env.AWS_REGION || 'ap-northeast-2',
    credentials: defaultProvider(),
  });

  const payload = await client.send(
    new GetSecretValueCommand({
      SecretId: secretId,
    }),
  );

  return JSON.parse(payload.SecretString);
};

const loadMysql = (secretId: string, config) => {
  if (secretId) {
    dbConfig = plainToInstance(DbConfig, config.databases);
  } else {
    dbConfig = {
      localhost: {
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'defi',
      },
    };
  }
};

const loadRedis = (secretId: string, config) => {
  if (secretId) {
    const redisInfo = config.redis.pool;

    const redis: RedisOptions = {
      username: redisInfo?.username,
      password: redisInfo?.password,
      engine: redisInfo.engine,
      host: redisInfo.host,
      reader: redisInfo.reader,
      port: redisInfo.port,
      cluster: redisInfo.cluster,
    };

    redisConfig = plainToInstance(RedisConfig, redis);
  } else {
    redisConfig = {
      host: 'localhost',
      port: 6379,
    };
  }
};

export const loadSecretConfig = async (secretId: string) => {
  let config;

  if (secretId) {
    config = await loadSecretManager(secretId);
  }

  loadRedis(secretId, config);
  loadMysql(secretId, config);
};

export const getDbConfig = () => {
  return dbConfig;
};

export const getRedisConfig = () => {
  return redisConfig;
};
