import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { ERROR_MESSAGES } from '../../common/exceptions/errors-messages.const';
import { MovieDto } from '../dto/movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { FilterMovieParams } from '../params/filter-movie.params';
import { MovieRepository } from '../repositories/movie.repository';
import { DatabaseExceptions } from '../../common/exceptions/database-exceptions.service';
import { PaginationResponse } from '../../common/pagination/pagination.response';
import { Movie } from '../entities/movie.entity';

@Injectable()
export class MovieService {
  context = 'Movie';

  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly databaseExceptions: DatabaseExceptions,
  ) {}

  async createMovie(movie: MovieDto): Promise<Movie> {
    try {
      const ceratedMovie = await this.movieRepository.create(movie);
      return await this.movieRepository.selectOneBy({ id: ceratedMovie.id });
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }

  async deleteMovie(id: number): Promise<DeleteResult> {
    try {
      const deleteResult = await this.movieRepository.delete({ id });
      if (!deleteResult.affected) {
        this.databaseExceptions.handleDatabaseError(
          new NotFoundException(
            this.databaseExceptions.formatMessage(
              ERROR_MESSAGES.NO_DATA_FOUND,
              this.context,
            ),
          ),
        );
      }
      return deleteResult;
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }

  async editMovie(id: number, movieDto: UpdateMovieDto): Promise<Movie> {
    try {
      const movie = await this.movieRepository.selectOneBy({ id });
      Object.assign(movie, movieDto);
      if (movieDto.releaseDate) {
        movie.releaseDate = new Date(movieDto.releaseDate);
      }
      return await this.movieRepository.update(movie);
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }

  async getSpecificMovie(id: number): Promise<Movie> {
    try {
      return await this.movieRepository.selectOneBy({ id });
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }

  async getAllMovies(
    filters: FilterMovieParams,
  ): Promise<PaginationResponse<Movie>> {
    try {
      const [movies, total] = await this.movieRepository.selectBy(filters);

      return {
        data: movies,
        metadata: {
          limit: filters.limit,
          offset: filters.offset,
          total,
        },
      };
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }
}
