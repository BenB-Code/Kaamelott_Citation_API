import type { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import {
  ADMIN_API_KEYS,
  API_PORT,
  APP_NAME,
  BUILD_TARGET,
  DATABASE_URL,
  DB_HOST,
  DB_HOST_AUTH_METHOD,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_SSL,
  DB_SYNC,
  DB_USER,
  ENV,
  NODE_ENV,
  USER_API_KEYS,
} from './config.constants';

export interface ConfigType {
  database: TypeOrmModule;
}
export const appConfigSchema = Joi.object({
  [APP_NAME]: Joi.string().default('Kaamelott_Citation_API'),
  [ENV]: Joi.string().default('dev'),
  [NODE_ENV]: Joi.string().default('development'),
  [BUILD_TARGET]: Joi.string().default('development'),
  [ADMIN_API_KEYS]: Joi.string().required(),
  [USER_API_KEYS]: Joi.string().required(),
  [DB_HOST]: Joi.string().required(),
  [DB_NAME]: Joi.string().required(),
  [DB_USER]: Joi.string().required(),
  [DB_PASSWORD]: Joi.string().required(),
  [DB_PORT]: Joi.number().default(5432),
  [DB_HOST_AUTH_METHOD]: Joi.string().required(),
  [DB_SSL]: Joi.string().valid('true', 'false').default('true'),
  [DB_SYNC]: Joi.number().valid(0, 1).required(),
  [DATABASE_URL]: Joi.string(),
  [API_PORT]: Joi.number().default(3000),
});
