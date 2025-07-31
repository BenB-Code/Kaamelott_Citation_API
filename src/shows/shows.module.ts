import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episode } from './entities/episode.entity';
import { Movie } from './entities/movie.entity';
import { Season } from './entities/season.entity';
import { Show } from './entities/show.entity';
import { ShowsController } from './shows.controller';
import { ShowsService } from './shows.service';

@Module({
  controllers: [ShowsController],
  imports: [TypeOrmModule.forFeature([Show, Season, Movie, Episode])],
  providers: [ShowsService],
})
export class ShowsModule {}
