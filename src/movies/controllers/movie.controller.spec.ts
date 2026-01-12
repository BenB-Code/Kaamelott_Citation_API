import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '../../common/pagination/pagination.response';
import { MovieDto } from '../dto/movie.dto';
import { FilterMovieParams } from '../params/filter-movie.params';
import { MovieService } from '../services/movie.service';
import { MovieController } from './movie.controller';
import { Movie } from '../entities/movie.entity';

describe('MovieController', () => {
  let movieService: MovieService;
  let movieController: MovieController;

  const mockMovieDto: MovieDto = {
    showId: 1,
    name: 'Film Kaamelott',
    releaseDate: '2021-07-21',
    picture: 'path/to/picture',
  };

  const mockMovie = {
    id: 1,
    name: mockMovieDto.name,
    releaseDate: new Date(mockMovieDto.releaseDate),
    picture: mockMovieDto.picture,
    show: { id: mockMovieDto.showId },
    createdAt: new Date('2025-08-26'),
    updatedAt: new Date('2025-08-26'),
  } as Movie;

  const mockPaginationResponse: PaginationResponse<Movie> = {
    data: [mockMovie],
    metadata: {
      limit: 100,
      offset: 0,
      total: 1,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieController,
        {
          provide: MovieService,
          useValue: {
            createMovie: jest.fn(),
            getAllMovies: jest.fn(),
            deleteMovie: jest.fn(),
            editMovie: jest.fn(),
            getSpecificMovie: jest.fn(),
          },
        },
      ],
    }).compile();

    movieController = module.get<MovieController>(MovieController);
    movieService = module.get<MovieService>(MovieService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(movieController).toBeDefined();
  });

  it('should call create', async () => {
    await movieController.createMovie(mockMovieDto);

    expect(movieService.createMovie).toHaveBeenCalledTimes(1);
    expect(movieService.createMovie).toHaveBeenCalledWith(mockMovieDto);
  });

  it('should call delete', async () => {
    await movieController.deleteSpecificMovie(1);

    expect(movieService.deleteMovie).toHaveBeenCalledTimes(1);
    expect(movieService.deleteMovie).toHaveBeenCalledWith(1);
  });

  it('should call editMovie', async () => {
    await movieController.editSpecificMovie(1, mockMovieDto);

    expect(movieService.editMovie).toHaveBeenCalledTimes(1);
    expect(movieService.editMovie).toHaveBeenCalledWith(1, mockMovieDto);
  });

  it('should call getSpecificMovie', async () => {
    await movieController.getSpecificMovie(1);

    expect(movieService.getSpecificMovie).toHaveBeenCalledTimes(1);
    expect(movieService.getSpecificMovie).toHaveBeenLastCalledWith(1);
  });

  describe('getAllMovies', () => {
    it('should call getAllMovies and return paginated response with complex filters', async () => {
      const complexFilters = {
        search: 'test',
        showId: 1,
        name: 'Film Kaamelott',
        releaseDate: '2021-07-21',
        limit: 10,
        offset: 20,
        sortBy: 'name',
        sortOrder: 'ASC',
      } as FilterMovieParams;

      (movieService.getAllMovies as jest.Mock).mockResolvedValue(mockPaginationResponse);

      const result = await movieController.getAllMovies(complexFilters);

      expect(movieService.getAllMovies).toHaveBeenCalledTimes(1);
      expect(movieService.getAllMovies).toHaveBeenCalledWith(complexFilters);
      expect(result).toEqual(mockPaginationResponse);
    });

    it('should call getAllMovies with empty filters', async () => {
      const emptyFilters = {} as FilterMovieParams;
      const emptyResponse = {
        data: [],
        metadata: { limit: 100, offset: 0, total: 0 },
      };
      (movieService.getAllMovies as jest.Mock).mockResolvedValue(emptyResponse);

      const result = await movieController.getAllMovies(emptyFilters);

      expect(movieService.getAllMovies).toHaveBeenCalledTimes(1);
      expect(movieService.getAllMovies).toHaveBeenCalledWith(emptyFilters);
      expect(result).toEqual(emptyResponse);
    });
  });
});
