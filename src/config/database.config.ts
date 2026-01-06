import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const DatabaseConfig = registerAs('database', (): TypeOrmModuleOptions => {
  const sslConfig =
    process.env.DB_SSL === 'true'
      ? {
          ssl: {
            rejectUnauthorized: process.env.NODE_ENV === 'production',
          },
          extra: { sslmode: 'require' },
        }
      : {
          extra: { sslmode: 'disable' },
        };

  const config: TypeOrmModuleOptions = {
    type: 'postgres',

    ...(process.env.DATABASE_URL
      ? {
          url: process.env.DATABASE_URL,
        }
      : {
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT ?? '5432', 10),
          database: process.env.DB_NAME,
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
        }),
    synchronize: process.env.DB_SYNC === '1',
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/src/migrations/**/*{.ts,.js}'],
    ...sslConfig,
  };

  return config;
});
