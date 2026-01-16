import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from './controllers/movie.controller';
import { MovieRepository } from './repositories/movie.repository';
import { MovieService } from './services/movie.service';
import { Movie } from './entities/movie.entity';
import { DatabaseExceptions } from '../common/exceptions';

@Module({
  controllers: [MovieController],
  imports: [TypeOrmModule.forFeature([Movie])],
  providers: [MovieService, MovieRepository, DatabaseExceptions],
})
export class MovieModule {}
