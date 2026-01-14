import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { SeasonController } from '../src/seasons/controllers/season.controller';
import { SeasonService } from '../src/seasons/services/season.service';
import { Season } from '../src/seasons/entities/season.entity';

describe('SeasonController (e2e)', () => {
  let app: INestApplication<App>;

  const mockSeason: Partial<Season> = {
    id: 1,
    name: 'Livre I',
    picture: 'https://example.com/livre1.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockSeasonService = {
    getAllSeasons: jest.fn().mockResolvedValue({
      data: [mockSeason],
      meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
    }),
    getSpecificSeason: jest.fn().mockResolvedValue(mockSeason),
    createSeason: jest.fn().mockResolvedValue(mockSeason),
    editSeason: jest.fn().mockResolvedValue({ ...mockSeason, name: 'Livre II' }),
    deleteSeason: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [SeasonController],
      providers: [
        {
          provide: SeasonService,
          useValue: mockSeasonService,
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

  describe('GET /season', () => {
    it('should return paginated seasons', () => {
      return request(app.getHttpServer())
        .get('/season')
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body).toHaveProperty('data');
          expect(res.body).toHaveProperty('meta');
          expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    it('should accept pagination query params', () => {
      return request(app.getHttpServer()).get('/season?page=1&limit=10').expect(HttpStatus.OK);
    });
  });

  describe('GET /season/:id', () => {
    it('should return a specific season', () => {
      return request(app.getHttpServer())
        .get('/season/1')
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body.id).toBe(1);
          expect(res.body.name).toBe('Livre I');
        });
    });

    it('should return 400 for invalid id', () => {
      return request(app.getHttpServer()).get('/season/invalid').expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('POST /season', () => {
    it('should create a season', () => {
      return request(app.getHttpServer())
        .post('/season')
        .send({ name: 'Livre I', showId: 1 })
        .expect(HttpStatus.CREATED)
        .expect((res) => {
          expect(res.body.name).toBe('Livre I');
        });
    });

    it('should return 400 for missing required fields', () => {
      return request(app.getHttpServer())
        .post('/season')
        .send({ name: 'Livre I' })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 for empty name', () => {
      return request(app.getHttpServer())
        .post('/season')
        .send({ name: '', showId: 1 })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 for invalid showId', () => {
      return request(app.getHttpServer())
        .post('/season')
        .send({ name: 'Livre I', showId: -1 })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('PATCH /season/:id', () => {
    it('should update a season', () => {
      return request(app.getHttpServer())
        .patch('/season/1')
        .send({ name: 'Livre II' })
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body.name).toBe('Livre II');
        });
    });
  });

  describe('DELETE /season/:id', () => {
    it('should delete a season', () => {
      return request(app.getHttpServer()).delete('/season/1').expect(HttpStatus.NO_CONTENT);
    });
  });
});
