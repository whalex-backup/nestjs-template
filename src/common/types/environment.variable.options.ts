import { DbConfig } from "../configs/db.config/db.config";

export interface EnvironmentVariable {
    awsRedisSecretId?: string;
    awsDbSecretId?: string;
    dbConfigs?: DbConfig;
    listenPort: number;
    stage: string;
  }
  