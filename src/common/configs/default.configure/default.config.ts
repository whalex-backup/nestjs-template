import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { EnvironmentVariable } from '@src/common/types/environment.variable.options';
import { loadParameter } from '@src/common/utils';
import {
  getDbConfig,
  getRedisConfig,
} from '../secret.manager.configure/secret.manager.config';

const config = {
  awsRedisSecretId: process.env.AWS_COMMON_SECRETS_ID,
  listenPort: Number(process.env.LISTEN_PORT || '0'),
  requestId: process.env.REQUEST_ID,
  stage: process.env.STAGE,
  apiKeys: null,
  web3Keys: null,
};

export const loadSsmConfig = async (ssmKey: string) => {
  if (ssmKey) {
    const ssmKeys = await loadParameter(ssmKey);
    config.web3Keys = ssmKeys;
  } else {
    config.web3Keys = {
      web3Url: 'http://localhost:8545',
    };
  }
};

export const loadApiKeyConfig = async (secretId: string) => {
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
