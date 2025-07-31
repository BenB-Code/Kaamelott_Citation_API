import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { appConfigSchema } from './database/config.types';
import { typeOrmConfig } from './database/typeOrm.config';
import { HealthModule } from './health/health.module';
import { Episode } from './shows/entities/episode.entity';
import { Movie } from './shows/entities/movie.entity';
import { Season } from './shows/entities/season.entity';
import { Show } from './shows/entities/show.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: resolve(
        process.cwd(),
        'docker',
        'environment',
        `.env.${process.env.ENV || 'dev'}`,
      ),
      isGlobal: true,
      load: [typeOrmConfig],
      validationSchema: appConfigSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...(await configService.get('database')),
        entities: [Show, Season, Movie, Episode],
      }),
    }),
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
