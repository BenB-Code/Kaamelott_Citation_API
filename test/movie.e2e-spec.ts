import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { MovieController } from '../src/movies/controllers/movie.controller';
import { MovieService } from '../src/movies/services/movie.service';
import { Movie } from '../src/movies/entities/movie.entity';

describe('MovieController (e2e)', () => {
  let app: INestApplication<App>;

  const mockMovie: Partial<Movie> = {
    id: 1,
    name: 'Kaamelott: Premier Volet',
    releaseDate: new Date('2021-07-21'),
    picture: 'https://example.com/kaamelott-film.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockMovieService = {
    getAllMovies: jest.fn().mockResolvedValue({
      data: [mockMovie],
      meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
    }),
    getSpecificMovie: jest.fn().mockResolvedValue(mockMovie),
    createMovie: jest.fn().mockResolvedValue(mockMovie),
    editMovie: jest.fn().mockResolvedValue({ ...mockMovie, name: 'Kaamelott: Deuxieme Volet' }),
    deleteMovie: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: MovieService,
          useValue: mockMovieService,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /movie', () => {
    it('should return paginated movies', () => {
      return request(app.getHttpServer())
        .get('/movie')
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body).toHaveProperty('data');
          expect(res.body).toHaveProperty('meta');
          expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    it('should accept pagination query params', () => {
      return request(app.getHttpServer()).get('/movie?page=1&limit=10').expect(HttpStatus.OK);
    });
  });

  describe('GET /movie/:id', () => {
    it('should return a specific movie', () => {
      return request(app.getHttpServer())
        .get('/movie/1')
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body.id).toBe(1);
          expect(res.body.name).toBe('Kaamelott: Premier Volet');
        });
    });

    it('should return 400 for invalid id', () => {
      return request(app.getHttpServer()).get('/movie/invalid').expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('POST /movie', () => {
    it('should create a movie', () => {
      return request(app.getHttpServer())
        .post('/movie')
        .send({
          showId: 1,
          name: 'Kaamelott: Premier Volet',
          releaseDate: '2021-07-21',
        })
        .expect(HttpStatus.CREATED)
        .expect((res) => {
          expect(res.body.name).toBe('Kaamelott: Premier Volet');
        });
    });

    it('should return 400 for missing required fields', () => {
      return request(app.getHttpServer())
        .post('/movie')
        .send({ name: 'Kaamelott: Premier Volet' })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 for invalid releaseDate format', () => {
      return request(app.getHttpServer())
        .post('/movie')
        .send({
          showId: 1,
          name: 'Kaamelott: Premier Volet',
          releaseDate: 'invalid-date',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 for empty name', () => {
      return request(app.getHttpServer())
        .post('/movie')
        .send({
          showId: 1,
          name: '',
          releaseDate: '2021-07-21',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 for invalid showId', () => {
      return request(app.getHttpServer())
        .post('/movie')
        .send({
          showId: -1,
          name: 'Kaamelott: Premier Volet',
          releaseDate: '2021-07-21',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('PATCH /movie/:id', () => {
    it('should update a movie', () => {
      return request(app.getHttpServer())
        .patch('/movie/1')
        .send({ name: 'Kaamelott: Deuxieme Volet' })
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body.name).toBe('Kaamelott: Deuxieme Volet');
        });
    });
  });

  describe('DELETE /movie/:id', () => {
    it('should delete a movie', () => {
      return request(app.getHttpServer()).delete('/movie/1').expect(HttpStatus.NO_CONTENT);
    });
  });
});
