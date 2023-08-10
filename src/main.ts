import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { defiSwapRedisServerConfig } from './common/configs/redis.configure/redis.mq.server.config';
import { ConfigService } from '@nestjs/config';
import { loadConfig } from './common/configs/secret.manager.configure/secret.manager.config';
import {
  loadApiKeyConfig,
  loadSsmConfig,
} from './common/configs/default.configure/default.config';

async function bootstrap() {
  await loadConfig(process.env.AWS_COMMON_SECRETS_ID as string);
  await loadSsmConfig(process.env.AWS_DEFI_SSM_ID as string);

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
