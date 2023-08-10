import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { loadParameter } from '@src/common/utils';
import { DbConfig } from '../db.config/db.config';
import {
  getDbConfig,
  getRedisConfig,
} from '../secret.manager.configure/secret.manager.config';

interface EnvironmentVariable {
  awsRedisSecretId?: string;
  awsDbSecretId?: string;
  dbConfigs?: DbConfig;
  listenPort: number;
  stage: string;
}

const config = {
  awsRedisSecretId: process.env.AWS_COMMON_SECRETS_ID,
  listenPort: Number(process.env.LISTEN_PORT || '0'),
  requestId: process.env.REQUEST_ID as string,
  stage: process.env.STAGE as string,
  apiKeys: null,
  web3Keys: null,
};

export const loadSsmConfig = async (param) => {
  if (param) {
    const ssmKeys = await loadParameter(param);
    config.web3Keys = ssmKeys;
  } else {
    config.web3Keys = {
      web3Url: 'http://localhost:8545',
    };
  }
};

export const loadApiKeyConfig = async (secretId) => {
  if (secretId) {
    const client = new SecretsManagerClient({
      region: process.env.AWS_REGION || 'ap-northeast-2',
      credentials: defaultProvider(),
    });

    const payload = await client.send(
      new GetSecretValueCommand({
        SecretId: secretId,
      }),
    );

    config.apiKeys = JSON.parse(payload.SecretString);
  } else {
    config.apiKeys = '';
  }
};

export default () =>
  ({
    ...config,
    dbConfigs: getDbConfig(),
    redisConfigs: getRedisConfig(),
  } as EnvironmentVariable);
