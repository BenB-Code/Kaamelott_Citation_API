import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { MovieDto } from '../dto/movie.dto';
import { FindMovieDto } from '../dto/find-movie.dto';
import { FilterMovieParams } from '../params/filter-movie.params';
import { Movie } from '../entities/movie.entity';

@Injectable()
export class MovieRepository {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async create(movie: MovieDto): Promise<Movie> {
    return await this.movieRepository.save({
      name: movie.name,
      releaseDate: new Date(movie.releaseDate),
      picture: movie.picture,
      show: { id: movie.showId },
    });
  }

  async update(movie: Movie): Promise<Movie> {
    return await this.movieRepository.save(movie);
  }

  async delete(criteria: FindMovieDto): Promise<DeleteResult> {
    return await this.movieRepository.delete(criteria);
  }

  async selectOneBy(filter: FindMovieDto): Promise<Movie> {
    const query = this.movieRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.show', 'show')
      .leftJoin('movie.citations', 'citation')
      .select([
        'movie.id',
        'movie.name',
        'movie.releaseDate',
        'movie.picture',
        'movie.createdAt',
        'movie.updatedAt',
        'show.id',
        'show.name',
        'citation.id',
      ]);

    if (filter.id) {
      query.andWhere(`movie.id = :id`, {
        id: filter.id,
      });
    }
    if (filter.showId) {
      query.andWhere(`show.id = :showId`, {
        showId: filter.showId,
      });
    }
    if (filter.name) {
      query.andWhere(`LOWER(movie.name) = LOWER(:name)`, {
        name: filter.name,
      });
    }
    if (filter.releaseDate) {
      query.andWhere(`movie.releaseDate = :releaseDate`, {
        releaseDate: filter.releaseDate,
      });
    }
    return await query.getOneOrFail();
  }

  async selectBy(filter: FilterMovieParams): Promise<[Movie[], number]> {
    const query = this.movieRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.show', 'show')
      .leftJoin('movie.citations', 'citation')
      .select([
        'movie.id',
        'movie.name',
        'movie.releaseDate',
        'movie.picture',
        'movie.createdAt',
        'movie.updatedAt',
        'show.id',
        'show.name',
        'citation.id',
      ]);

    if (filter.showId) {
      query.andWhere(`show.id = :showId`, {
        showId: filter.showId,
      });
    }
    if (filter.name) {
      query.andWhere(`LOWER(movie.name) = LOWER(:name)`, {
        name: filter.name,
      });
    }
    if (filter.releaseDate) {
      query.andWhere(`movie.releaseDate = :releaseDate`, {
        releaseDate: filter.releaseDate,
      });
    }
    if (filter.search) {
      query.andWhere(`LOWER(movie.name) ILIKE LOWER(:search)`, {
        search: `%${filter.search}%`,
      });
    }

    query.orderBy(`movie.${filter.sortBy}`, filter.sortOrder);
    query.skip(filter.offset).take(filter.limit);

    return await query.getManyAndCount();
  }
}
