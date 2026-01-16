import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';
import { Actor } from './actors/entities/actor.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './authors/author.module';
import { Author } from './authors/entities/author.entity';

import { ActorModule } from './actors/actor.module';
import { CharacterModule } from './characters/character.module';
import { Character } from './characters/entities/character.entity';
import { Citation } from './citations/entities/citation.entity';
import { LogLevelEnum } from './common/logger/models/log-level.enum';
import { Logger } from './common/logger/services/logger.service';
import { appConfigSchema, DatabaseConfig } from './config';
import { Show } from './shows/entities/show.entity';
import { Season } from './seasons/entities/season.entity';
import { Movie } from './movies/entities/movie.entity';
import { Episode } from './episodes/entities/episode.entity';
import { HealthModule } from './health/health.module';
import { ShowsModule } from './shows/shows.module';
import { SeasonModule } from './seasons/season.module';
import { EpisodeModule } from './episodes/episode.module';
import { MovieModule } from './movies/movie.module';
import { CitationModule } from './citations/citation.module';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './common/guards/api-key/api-key.guard';
import { ThrottlerModule } from '@nestjs/throttler';
import {
  RATE_LIMIT_ADMIN,
  RATE_LIMIT_PUBLIC,
  RATE_LIMIT_TTL,
  RATE_LIMIT_USER,
  THROTTLER_ADMIN,
  THROTTLER_PUBLIC,
  THROTTLER_USER,
} from './common/constants';
import { CustomThrottlerGuard } from './common/guards/custom-throttler/custom-throttler.guard';

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
      load: [DatabaseConfig],
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
        entities: [Show, Season, Movie, Episode, Author, Actor, Character, Citation],
      }),
    }),
    ThrottlerModule.forRoot([
      {
        name: THROTTLER_PUBLIC,
        ttl: RATE_LIMIT_TTL,
        limit: RATE_LIMIT_PUBLIC,
      },
      {
        name: THROTTLER_USER,
        ttl: RATE_LIMIT_TTL,
        limit: RATE_LIMIT_USER,
      },
      {
        name: THROTTLER_ADMIN,
        ttl: RATE_LIMIT_TTL,
        limit: RATE_LIMIT_ADMIN,
      },
    ]),
    HealthModule,
    AuthorModule,
    CharacterModule,
    ActorModule,
    ShowsModule,
    SeasonModule,
    EpisodeModule,
    MovieModule,
    CitationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
    {
      provide: Logger,
      useFactory: () =>
        Logger.getInstance({
          logLevel: LogLevelEnum.DEBUG,
          colorize: true,
        }),
    },
  ],
})
export class AppModule {}
