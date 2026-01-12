import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { MovieDto } from '../dto/movie.dto';
import { FilterMovieParams } from '../params/filter-movie.params';
import { MovieRepository } from './movie.repository';
import { Movie } from '../entities/movie.entity';

describe('MovieRepository', () => {
  let movieRepository: MovieRepository;
  let repository: Partial<Repository<Movie>>;

  const mockMovieDto: MovieDto = {
    showId: 1,
    name: 'Film Kaamelott',
    releaseDate: '2021-07-21',
    picture: 'path/to/picture',
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

  const mockQueryBuilder = {
    andWhere: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn(),
    leftJoin: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    getOneOrFail: jest.fn(),
  } as unknown as SelectQueryBuilder<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieRepository,
        {
          provide: getRepositoryToken(Movie),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            findOneByOrFail: jest.fn(),
            findBy: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
          },
        },
      ],
    }).compile();

    movieRepository = module.get<MovieRepository>(MovieRepository);
    repository = module.get<Partial<Repository<Movie>>>(getRepositoryToken(Movie));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(movieRepository).toBeDefined();
  });

  it('should call create', async () => {
    const expectedMovie = {
      name: mockMovieDto.name,
      releaseDate: mockMovieDto.releaseDate,
      picture: mockMovieDto.picture,
      show: { id: mockMovieDto.showId },
    };

    await movieRepository.create(mockMovieDto);

    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(repository.save).toHaveBeenCalledWith(expectedMovie);
  });

  it('should call delete', async () => {
    await movieRepository.delete({ id: mockMovie.id });

    expect(repository.delete).toHaveBeenCalledTimes(1);
    expect(repository.delete).toHaveBeenCalledWith({ id: mockMovie.id });
  });

  it('should call update', async () => {
    await movieRepository.update(mockMovie);

    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(repository.save).toHaveBeenCalledWith(mockMovie);
  });

  it('should call selectOneBy', async () => {
    mockQueryBuilder.getOneOrFail = jest.fn().mockResolvedValue(mockMovie);

    const result = await movieRepository.selectOneBy({
      name: 'Film Kaamelott',
      showId: 1,
      releaseDate: new Date('2021-07-21'),
      id: 12,
    });

    expect(repository.createQueryBuilder).toHaveBeenCalledWith('movie');
    expect(mockQueryBuilder.leftJoinAndSelect).toHaveBeenCalledWith('movie.show', 'show');
    expect(mockQueryBuilder.leftJoin).toHaveBeenCalledWith('movie.citations', 'citation');
    expect(mockQueryBuilder.select).toHaveBeenCalledWith([
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
    expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`LOWER(movie.name) = LOWER(:name)`, {
      name: 'Film Kaamelott',
    });
    expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`show.id = :showId`, { showId: 1 });
    expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`movie.releaseDate = :releaseDate`, {
      releaseDate: new Date('2021-07-21'),
    });
    expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`movie.id = :id`, {
      id: 12,
    });
    expect(result).toEqual(mockMovie);
  });

  describe('selectBy', () => {
    const mockMovies = [mockMovie];
    const mockCount = 1;

    beforeEach(() => {
      jest.clearAllMocks();
      mockQueryBuilder.getManyAndCount = jest.fn().mockResolvedValue([mockMovies, mockCount]);
    });

    it('should handle complex filters and query building', async () => {
      const complexFilters = {
        showId: 1,
        name: 'Film Kaamelott',
        releaseDate: '2021-07-21',
        search: 'test',
        limit: 20,
        offset: 10,
        sortBy: 'name',
        sortOrder: 'DESC',
      } as FilterMovieParams;

      const result = await movieRepository.selectBy(complexFilters);

      expect(repository.createQueryBuilder).toHaveBeenCalledTimes(1);
      expect(repository.createQueryBuilder).toHaveBeenCalledWith('movie');
      expect(mockQueryBuilder.leftJoinAndSelect).toHaveBeenCalledWith('movie.show', 'show');
      expect(mockQueryBuilder.leftJoin).toHaveBeenCalledWith('movie.citations', 'citation');
      expect(mockQueryBuilder.select).toHaveBeenCalledWith([
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

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`show.id = :showId`, {
        showId: complexFilters.showId,
      });
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`LOWER(movie.name) = LOWER(:name)`, {
        name: complexFilters.name,
      });
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`movie.releaseDate = :releaseDate`, {
        releaseDate: complexFilters.releaseDate,
      });
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        `LOWER(movie.name) ILIKE LOWER(:search)`,
        { search: `%${complexFilters.search}%` },
      );

      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
        `movie.${complexFilters.sortBy}`,
        complexFilters.sortOrder,
      );
      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(complexFilters.offset);
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(complexFilters.limit);
      expect(result).toEqual([mockMovies, mockCount]);
    });

    it('should handle empty filters with pagination only', async () => {
      const emptyFilters = {
        limit: 100,
        offset: 0,
        sortBy: 'createdAt',
        sortOrder: 'DESC',
      } as FilterMovieParams;

      await movieRepository.selectBy(emptyFilters);

      expect(mockQueryBuilder.andWhere).not.toHaveBeenCalled();
      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
        `movie.${emptyFilters.sortBy}`,
        emptyFilters.sortOrder,
      );
      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(emptyFilters.offset);
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(emptyFilters.limit);
    });

    it('should return empty result when no movies found', async () => {
      const basicFilters = {
        limit: 10,
        offset: 0,
        sortBy: 'id',
        sortOrder: 'ASC',
      } as FilterMovieParams;
      mockQueryBuilder.getManyAndCount = jest.fn().mockResolvedValue([[], 0]);

      const result = await movieRepository.selectBy(basicFilters);

      expect(result).toEqual([[], 0]);
    });

    it('should handle undefined sortBy with default empty string', async () => {
      const filtersWithoutSortBy = {
        limit: 10,
        offset: 0,
        sortBy: undefined,
        sortOrder: 'ASC',
      } as FilterMovieParams;

      await movieRepository.selectBy(filtersWithoutSortBy);

      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith('movie.', 'ASC');
    });

    it('should properly construct case-insensitive queries', async () => {
      const caseFilter = {
        showId: 1,
        name: 'FILM KAAMELOTT',
        releaseDate: '2021-07-21',
        search: 'TEST',
        limit: 10,
        offset: 0,
        sortBy: 'createdAt',
        sortOrder: 'DESC',
      } as FilterMovieParams;

      await movieRepository.selectBy(caseFilter);

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`show.id = :showId`, { showId: 1 });
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`LOWER(movie.name) = LOWER(:name)`, {
        name: 'FILM KAAMELOTT',
      });
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`movie.releaseDate = :releaseDate`, {
        releaseDate: '2021-07-21',
      });
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        `LOWER(movie.name) ILIKE LOWER(:search)`,
        { search: '%TEST%' },
      );
    });
  });
});
