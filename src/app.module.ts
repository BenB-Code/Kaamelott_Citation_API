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
import { appConfigSchema } from './config/config.types';
import { DatabaseConfig } from './config/database.config';
import { HealthModule } from './health/health.module';
import { SeasonModule } from './seasons/season.module';
import { EpisodeModule } from './episodes/episode.module';
import { MovieModule } from './movies/movie.module';
import { Episode } from './episodes/entities/episode.entity';
import { Movie } from './movies/entities/movie.entity';
import { Show } from './shows/entities/show.entity';
import { ShowsModule } from './shows/shows.module';
import { Season } from './seasons/entities/season.entity';
import { CitationModule } from './citations/citation.module';

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
