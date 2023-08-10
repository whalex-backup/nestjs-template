import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { defiSwapRedisServerConfig } from './common/configs/redis.configure/redis.mq.server.config';
import { ConfigService } from '@nestjs/config';
import { loadSecretConfig } from './common/configs/secret.manager.configure/secret.manager.config';
import {
  loadApiKeyConfig,
  loadSsmConfig,
} from './common/configs/default.configure/default.config';

async function bootstrap() {
  // descriptioN
  await loadSecretConfig(process.env.AWS_COMMON_SECRETS_ID);
  await loadSsmConfig(process.env.AWS_DEFI_SSM_ID);

  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  const redisOptions = defiSwapRedisServerConfig(configService, {
    retryAttempts: 0,
    retryDelay: 0,
  });

  app.connectMicroservice(redisOptions);

  await app.listen(3000);
}
bootstrap();
