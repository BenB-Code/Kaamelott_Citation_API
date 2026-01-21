import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { ActorController } from '../src/actors/controllers/actor.controller';
import { ActorService } from '../src/actors/services/actor.service';
import { Actor } from '../src/actors/entities/actor.entity';

describe('ActorController (e2e)', () => {
  let app: INestApplication<App>;

  const mockActor: Partial<Actor> = {
    id: 1,
    firstName: 'Alexandre',
    lastName: 'Astier',
    picture: 'https://example.com/astier.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockActorService = {
    getAllActors: jest.fn().mockResolvedValue({
      data: [mockActor],
      meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
    }),
    getSpecificActor: jest.fn().mockResolvedValue(mockActor),
    createActor: jest.fn().mockResolvedValue(mockActor),
    editActor: jest.fn().mockResolvedValue({ ...mockActor, firstName: 'Alex' }),
    deleteActor: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ActorController],
      providers: [
        {
          provide: ActorService,
          useValue: mockActorService,
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

  describe('GET /actor', () => {
    it('should return paginated actors', () => {
      return request(app.getHttpServer())
        .get('/actor')
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body).toHaveProperty('data');
          expect(res.body).toHaveProperty('meta');
          expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    it('should accept pagination query params', () => {
      return request(app.getHttpServer()).get('/actor?page=1&limit=10').expect(HttpStatus.OK);
    });
  });

  describe('GET /actor/:id', () => {
    it('should return a specific actor', () => {
      return request(app.getHttpServer())
        .get('/actor/1')
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body.id).toBe(1);
          expect(res.body.firstName).toBe('Alexandre');
        });
    });

    it('should return 400 for invalid id', () => {
      return request(app.getHttpServer()).get('/actor/invalid').expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('POST /actor', () => {
    it('should create an actor', () => {
      return request(app.getHttpServer())
        .post('/actor')
        .send({ firstName: 'Alexandre', lastName: 'Astier' })
        .expect(HttpStatus.CREATED)
        .expect((res) => {
          expect(res.body.firstName).toBe('Alexandre');
        });
    });

    it('should return 400 for missing required fields', () => {
      return request(app.getHttpServer())
        .post('/actor')
        .send({ firstName: 'Alexandre' })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 for empty firstName', () => {
      return request(app.getHttpServer())
        .post('/actor')
        .send({ firstName: '', lastName: 'Astier' })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('PATCH /actor/:id', () => {
    it('should update an actor', () => {
      return request(app.getHttpServer())
        .patch('/actor/1')
        .send({ firstName: 'Alex' })
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body.firstName).toBe('Alex');
        });
    });
  });

  describe('DELETE /actor/:id', () => {
    it('should delete an actor', () => {
      return request(app.getHttpServer()).delete('/actor/1').expect(HttpStatus.NO_CONTENT);
    });
  });
});
