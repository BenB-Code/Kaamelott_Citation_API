import { config } from 'dotenv';
import { resolve } from 'path';
import { DataSource } from 'typeorm';

const envPath = process.env.ENV
  ? resolve(process.cwd(), 'docker', 'environment', `.env.${process.env.ENV}`)
  : resolve(process.cwd(), 'docker', 'environment', '.env.local');

config({ path: envPath });

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  synchronize: false,
  ssl:
    process.env.DB_SSL === 'true'
      ? {
          rejectUnauthorized: process.env.NODE_ENV === 'production',
        }
      : false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
});
