import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { CharacterController } from '../src/characters/controllers/character.controller';
import { CharacterService } from '../src/characters/services/character.service';
import { Character } from '../src/characters/entities/character.entity';

describe('CharacterController (e2e)', () => {
  let app: INestApplication<App>;

  const mockCharacter: Partial<Character> = {
    id: 1,
    name: 'Arthur',
    picture: 'https://example.com/arthur.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCharacterService = {
    getAllCharacters: jest.fn().mockResolvedValue({
      data: [mockCharacter],
      meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
    }),
    getSpecificCharacter: jest.fn().mockResolvedValue(mockCharacter),
    createCharacter: jest.fn().mockResolvedValue(mockCharacter),
    editCharacter: jest.fn().mockResolvedValue({ ...mockCharacter, name: 'Arthur Pendragon' }),
    deleteCharacter: jest.fn().mockResolvedValue({ affected: 1 }),
    associateCharacterActor: jest.fn().mockResolvedValue(undefined),
    dissociateCharacterActor: jest.fn().mockResolvedValue(undefined),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [CharacterController],
      providers: [
        {
          provide: CharacterService,
          useValue: mockCharacterService,
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

  describe('GET /character', () => {
    it('should return paginated characters', () => {
      return request(app.getHttpServer())
        .get('/character')
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body).toHaveProperty('data');
          expect(res.body).toHaveProperty('meta');
          expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    it('should accept pagination query params', () => {
      return request(app.getHttpServer()).get('/character?page=1&limit=10').expect(HttpStatus.OK);
    });
  });

  describe('GET /character/:id', () => {
    it('should return a specific character', () => {
      return request(app.getHttpServer())
        .get('/character/1')
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body.id).toBe(1);
          expect(res.body.name).toBe('Arthur');
        });
    });

    it('should return 400 for invalid id', () => {
      return request(app.getHttpServer()).get('/character/invalid').expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('POST /character', () => {
    it('should create a character', () => {
      return request(app.getHttpServer())
        .post('/character')
        .send({ name: 'Arthur' })
        .expect(HttpStatus.CREATED)
        .expect((res) => {
          expect(res.body.name).toBe('Arthur');
        });
    });

    it('should return 400 for missing required fields', () => {
      return request(app.getHttpServer())
        .post('/character')
        .send({})
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 for empty name', () => {
      return request(app.getHttpServer())
        .post('/character')
        .send({ name: '' })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('PATCH /character/:id', () => {
    it('should update a character', () => {
      return request(app.getHttpServer())
        .patch('/character/1')
        .send({ name: 'Arthur Pendragon' })
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body.name).toBe('Arthur Pendragon');
        });
    });
  });

  describe('DELETE /character/:id', () => {
    it('should delete a character', () => {
      return request(app.getHttpServer()).delete('/character/1').expect(HttpStatus.NO_CONTENT);
    });
  });

  describe('POST /character/:characterId/actor/:actorId', () => {
    it('should associate an actor to a character', () => {
      return request(app.getHttpServer()).post('/character/1/actor/1').expect(HttpStatus.CREATED);
    });
  });

  describe('DELETE /character/:characterId/actor/:actorId', () => {
    it('should dissociate an actor from a character', () => {
      return request(app.getHttpServer())
        .delete('/character/1/actor/1')
        .expect(HttpStatus.NO_CONTENT);
    });
  });
});
