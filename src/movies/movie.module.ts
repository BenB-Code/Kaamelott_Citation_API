import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseExceptions } from '../common/exceptions/database-exceptions.service';
import { MovieController } from './controllers/movie.controller';
import { MovieRepository } from './repositories/movie.repository';
import { MovieService } from './services/movie.service';
import { Movie } from './entities/movie.entity';

@Module({
  controllers: [MovieController],
  imports: [TypeOrmModule.forFeature([Movie])],
  providers: [MovieService, MovieRepository, DatabaseExceptions],
})
export class MovieModule {}
