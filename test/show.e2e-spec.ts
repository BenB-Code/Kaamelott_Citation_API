import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { ShowController } from '../src/shows/controller/show.controller';
import { ShowService } from '../src/shows/services/show.service';
import { Show } from '../src/shows/entities/show.entity';
import { MediaType } from '../src/shows/constant/media-type.enum';

describe('ShowController (e2e)', () => {
  let app: INestApplication<App>;

  const mockShow: Partial<Show> = {
    id: 1,
    name: 'Kaamelott',
    mediaType: MediaType.SERIE,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockShowService = {
    getAllShows: jest.fn().mockResolvedValue({
      data: [mockShow],
      meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
    }),
    getSpecificShow: jest.fn().mockResolvedValue(mockShow),
    createShow: jest.fn().mockResolvedValue(mockShow),
    editShow: jest.fn().mockResolvedValue({ ...mockShow, name: 'Kaamelott Updated' }),
    deleteShow: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ShowController],
      providers: [
        {
          provide: ShowService,
          useValue: mockShowService,
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

  describe('GET /show', () => {
    it('should return paginated shows', () => {
      return request(app.getHttpServer())
        .get('/show')
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body).toHaveProperty('data');
          expect(res.body).toHaveProperty('meta');
          expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    it('should accept pagination query params', () => {
      return request(app.getHttpServer()).get('/show?page=1&limit=10').expect(HttpStatus.OK);
    });
  });

  describe('GET /show/:id', () => {
    it('should return a specific show', () => {
      return request(app.getHttpServer())
        .get('/show/1')
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body.id).toBe(1);
          expect(res.body.name).toBe('Kaamelott');
        });
    });

    it('should return 400 for invalid id', () => {
      return request(app.getHttpServer()).get('/show/invalid').expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('POST /show', () => {
    it('should create a show', () => {
      return request(app.getHttpServer())
        .post('/show')
        .send({ name: 'Kaamelott', mediaType: MediaType.SERIE })
        .expect(HttpStatus.CREATED)
        .expect((res) => {
          expect(res.body.name).toBe('Kaamelott');
        });
    });

    it('should return 400 for missing required fields', () => {
      return request(app.getHttpServer())
        .post('/show')
        .send({ name: 'Kaamelott' })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 for invalid mediaType', () => {
      return request(app.getHttpServer())
        .post('/show')
        .send({ name: 'Kaamelott', mediaType: 'invalid' })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 for empty name', () => {
      return request(app.getHttpServer())
        .post('/show')
        .send({ name: '', mediaType: MediaType.SERIE })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('PATCH /show/:id', () => {
    it('should update a show', () => {
      return request(app.getHttpServer())
        .patch('/show/1')
        .send({ name: 'Kaamelott Updated' })
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body.name).toBe('Kaamelott Updated');
        });
    });
  });

  describe('DELETE /show/:id', () => {
    it('should delete a show', () => {
      return request(app.getHttpServer()).delete('/show/1').expect(HttpStatus.NO_CONTENT);
    });
  });
});
