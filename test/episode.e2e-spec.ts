import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { EpisodeController } from '../src/episodes/controllers/episode.controller';
import { EpisodeService } from '../src/episodes/services/episode.service';
import { Episode } from '../src/episodes/entities/episode.entity';

describe('EpisodeController (e2e)', () => {
  let app: INestApplication<App>;

  const mockEpisode: Partial<Episode> = {
    id: 1,
    name: 'Heat',
    number: 1,
    picture: 'https://example.com/heat.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockEpisodeService = {
    getAllEpisodes: jest.fn().mockResolvedValue({
      data: [mockEpisode],
      meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
    }),
    getSpecificEpisode: jest.fn().mockResolvedValue(mockEpisode),
    createEpisode: jest.fn().mockResolvedValue(mockEpisode),
    editEpisode: jest.fn().mockResolvedValue({ ...mockEpisode, name: 'Heat Updated' }),
    deleteEpisode: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [EpisodeController],
      providers: [
        {
          provide: EpisodeService,
          useValue: mockEpisodeService,
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

  describe('GET /episode', () => {
    it('should return paginated episodes', () => {
      return request(app.getHttpServer())
        .get('/episode')
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body).toHaveProperty('data');
          expect(res.body).toHaveProperty('meta');
          expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    it('should accept pagination query params', () => {
      return request(app.getHttpServer()).get('/episode?page=1&limit=10').expect(HttpStatus.OK);
    });
  });

  describe('GET /episode/:id', () => {
    it('should return a specific episode', () => {
      return request(app.getHttpServer())
        .get('/episode/1')
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body.id).toBe(1);
          expect(res.body.name).toBe('Heat');
        });
    });

    it('should return 400 for invalid id', () => {
      return request(app.getHttpServer()).get('/episode/invalid').expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('POST /episode', () => {
    it('should create an episode', () => {
      return request(app.getHttpServer())
        .post('/episode')
        .send({ seasonId: 1, name: 'Heat', number: 1 })
        .expect(HttpStatus.CREATED)
        .expect((res) => {
          expect(res.body.name).toBe('Heat');
        });
    });

    it('should create an episode with only seasonId', () => {
      return request(app.getHttpServer())
        .post('/episode')
        .send({ seasonId: 1 })
        .expect(HttpStatus.CREATED);
    });

    it('should return 400 for missing seasonId', () => {
      return request(app.getHttpServer())
        .post('/episode')
        .send({ name: 'Heat' })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 for invalid seasonId', () => {
      return request(app.getHttpServer())
        .post('/episode')
        .send({ seasonId: -1, name: 'Heat' })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('PATCH /episode/:id', () => {
    it('should update an episode', () => {
      return request(app.getHttpServer())
        .patch('/episode/1')
        .send({ name: 'Heat Updated' })
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body.name).toBe('Heat Updated');
        });
    });
  });

  describe('DELETE /episode/:id', () => {
    it('should delete an episode', () => {
      return request(app.getHttpServer()).delete('/episode/1').expect(HttpStatus.NO_CONTENT);
    });
  });
});
