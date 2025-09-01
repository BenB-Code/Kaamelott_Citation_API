import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { MovieDto } from '../dto/movie.dto';
import { FilterMovieParams } from '../params/filter-movie.params';
import { DatabaseExceptions } from '../../common/exceptions/database-exceptions.service';
import { MovieRepository } from '../repositories/movie.repository';
import { MovieService } from './movie.service';
import { Movie } from '../entities/movie.entity';

describe('MovieService', () => {
  let movieService: MovieService;
  let movieRepository: MovieRepository;

  const mockMovieDto: MovieDto = {
    showId: 1,
    name: 'Film Kaamelott',
    releaseDate: '2021-07-21',
    picture: './path/to/my/profile-picture.png',
  };
  const mockMovie = {
    id: 12,
    name: mockMovieDto.name,
    releaseDate: new Date(mockMovieDto.releaseDate),
    picture: mockMovieDto.picture,
    show: { id: mockMovieDto.showId },
    createdAt: new Date('08-26-2025'),
    updatedAt: new Date('08-26-2025'),
  } as Movie;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: MovieRepository,
          useValue: {
            create: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
            selectOneBy: jest.fn(),
            selectBy: jest.fn(),
          },
        },
        DatabaseExceptions,
      ],
    }).compile();

    movieService = module.get<MovieService>(MovieService);
    movieRepository = module.get<MovieRepository>(MovieRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(movieService).toBeDefined();
  });

  describe('createMovie', () => {
    it('should create the movie', async () => {
      await movieService.createMovie(mockMovieDto);

      expect(movieRepository.create).toHaveBeenCalledTimes(1);
      expect(movieRepository.create).toHaveBeenCalledWith(mockMovieDto);
    });

    it('should throw: [UNIQUE_VIOLATION]', async () => {
      const mockError = new QueryFailedError('', [], {
        code: '23505',
      } as any);
      (movieRepository.create as jest.Mock).mockRejectedValue(mockError);

      try {
        await movieService.createMovie(mockMovieDto);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.response.message).toBe(
          '(Movie)[UNIQUE_VIOLATION] Cannot perform operation: Resource already exists',
        );
        expect(error.response.statusCode).toEqual(409);
      }
    });
  });

  describe('deleteMovie', () => {
    it('should delete the movie', async () => {
      (movieRepository.delete as jest.Mock).mockResolvedValue({
        raw: [],
        affected: 1,
      });

      const result = await movieService.deleteMovie(12345);

      expect(result).toEqual({
        raw: [],
        affected: 1,
      });
      expect(movieRepository.delete).toHaveBeenCalledTimes(1);
      expect(movieRepository.delete).toHaveBeenCalledWith({ id: 12345 });
    });

    it('should throw exception as is', async () => {
      (movieRepository.delete as jest.Mock).mockRejectedValue(
        new InternalServerErrorException(),
      );

      try {
        await movieService.deleteMovie(12345);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.status).toBe(500);
        expect(error.response.message).toBe('Internal Server Error');
      }
    });

    it('should throw: [NO_DATA_FOUND]', async () => {
      (movieRepository.delete as jest.Mock).mockResolvedValue({
        raw: [],
        affected: 0,
      });

      try {
        await movieService.deleteMovie(12345);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.status).toBe(404);
        expect(error.response.message).toBe(
          '(Movie)[NO_DATA_FOUND] Cannot perform operation: Data not found.',
        );
      }
    });
  });

  describe('editMovie', () => {
    it('should return updated movie', async () => {
      (movieRepository.selectOneBy as jest.Mock).mockResolvedValue(mockMovie);

      await movieService.editMovie(mockMovie.id, {
        name: 'Tested',
        showId: 3,
      });

      expect(movieRepository.update).toHaveBeenCalledTimes(1);
      expect(movieRepository.update).toHaveBeenCalledWith({
        ...mockMovie,
        name: 'Tested',
        showId: 3,
      });
    });

    it('should return updated movie with releaseDate', async () => {
      (movieRepository.selectOneBy as jest.Mock).mockResolvedValue(mockMovie);

      await movieService.editMovie(mockMovie.id, {
        name: 'Tested',
        releaseDate: '2022-01-01',
      });

      expect(movieRepository.update).toHaveBeenCalledTimes(1);
      expect(movieRepository.update).toHaveBeenCalledWith({
        ...mockMovie,
        name: 'Tested',
        releaseDate: new Date('2022-01-01'),
      });
    });

    it('should throw: [NO_DATA_FOUND]', async () => {
      (movieRepository.selectOneBy as jest.Mock).mockRejectedValue(
        new EntityNotFoundError(Movie, { id: 12345 }),
      );

      try {
        await movieService.editMovie(12345, mockMovieDto);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.status).toBe(404);
        expect(error.response.message).toBe(
          '(Movie)[NO_DATA_FOUND] Cannot perform operation: Data not found.',
        );
      }
    });
  });

  describe('getSpecificMovie', () => {
    it('should return the movie', async () => {
      await movieService.getSpecificMovie(1);

      expect(movieRepository.selectOneBy).toHaveBeenCalledTimes(1);
      expect(movieRepository.selectOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should throw: [NO_DATA_FOUND]', async () => {
      (movieRepository.selectOneBy as jest.Mock).mockRejectedValue(
        new EntityNotFoundError(Movie, { id: 12345 }),
      );

      try {
        await movieService.getSpecificMovie(12345);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.status).toBe(404);
        expect(error.response.message).toBe(
          '(Movie)[NO_DATA_FOUND] Cannot perform operation: Data not found.',
        );
      }
    });
  });

  describe('getAllMovies', () => {
    const mockMovies = [mockMovie];
    const mockCount = 1;

    it('should return paginated movies with complex filters', async () => {
      const complexFilters = {
        search: 'test',
        showId: 1,
        name: 'Film Kaamelott',
        releaseDate: '2021-07-21',
        sortBy: 'createdAt',
        sortOrder: 'DESC',
        limit: 20,
        offset: 10,
      } as FilterMovieParams;

      (movieRepository.selectBy as jest.Mock).mockResolvedValue([
        mockMovies,
        mockCount,
      ]);

      const result = await movieService.getAllMovies(complexFilters);

      expect(movieRepository.selectBy).toHaveBeenCalledTimes(1);
      expect(movieRepository.selectBy).toHaveBeenCalledWith(complexFilters);
      expect(result).toEqual({
        data: mockMovies,
        metadata: {
          limit: complexFilters.limit,
          offset: complexFilters.offset,
          total: mockCount,
        },
      });
    });

    it('should return empty result when no movies found', async () => {
      const emptyFilters = { limit: 10, offset: 0 } as FilterMovieParams;
      (movieRepository.selectBy as jest.Mock).mockResolvedValue([[], 0]);

      const result = await movieService.getAllMovies(emptyFilters);

      expect(movieRepository.selectBy).toHaveBeenCalledTimes(1);
      expect(movieRepository.selectBy).toHaveBeenCalledWith(emptyFilters);
      expect(result).toEqual({
        data: [],
        metadata: {
          limit: emptyFilters.limit,
          offset: emptyFilters.offset,
          total: 0,
        },
      });
    });

    it('should throw database exception when repository throws error', async () => {
      const mockError = new Error('Database connection failed');
      const basicFilters = { limit: 10, offset: 0 } as FilterMovieParams;
      (movieRepository.selectBy as jest.Mock).mockRejectedValue(mockError);

      try {
        await movieService.getAllMovies(basicFilters);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });
});
