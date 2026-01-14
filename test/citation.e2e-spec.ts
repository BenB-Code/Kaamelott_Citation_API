import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { CitationController } from '../src/citations/controllers/citation.controller';
import { CitationService } from '../src/citations/services/citation.service';
import { Citation } from '../src/citations/entities/citation.entity';

describe('CitationController (e2e)', () => {
  let app: INestApplication<App>;

  const mockCitation: Partial<Citation> = {
    id: 1,
    text: "C'est pas faux.",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCitationService = {
    getAllCitations: jest.fn().mockResolvedValue({
      data: [mockCitation],
      meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
    }),
    getSpecificCitation: jest.fn().mockResolvedValue(mockCitation),
    createCitation: jest.fn().mockResolvedValue(mockCitation),
    editCitation: jest.fn().mockResolvedValue({ ...mockCitation, text: 'Updated citation' }),
    deleteSpecificCitation: jest.fn().mockResolvedValue({ affected: 1 }),
    associateCitationWithField: jest.fn().mockResolvedValue(undefined),
    dissociateCitationWithField: jest.fn().mockResolvedValue(undefined),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [CitationController],
      providers: [
        {
          provide: CitationService,
          useValue: mockCitationService,
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

  describe('GET /citation', () => {
    it('should return paginated citations', () => {
      return request(app.getHttpServer())
        .get('/citation')
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body).toHaveProperty('data');
          expect(res.body).toHaveProperty('meta');
          expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    it('should accept pagination query params', () => {
      return request(app.getHttpServer()).get('/citation?page=1&limit=10').expect(HttpStatus.OK);
    });
  });

  describe('GET /citation/:id', () => {
    it('should return a specific citation', () => {
      return request(app.getHttpServer())
        .get('/citation/1')
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body.id).toBe(1);
          expect(res.body.text).toBe("C'est pas faux.");
        });
    });

    it('should return 400 for invalid id', () => {
      return request(app.getHttpServer()).get('/citation/invalid').expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('POST /citation', () => {
    it('should create a citation', () => {
      return request(app.getHttpServer())
        .post('/citation')
        .send({
          text: "C'est pas faux.",
          actorsId: [1],
          authorsId: [1],
          characterId: 1,
        })
        .expect(HttpStatus.CREATED)
        .expect((res) => {
          expect(res.body.text).toBe("C'est pas faux.");
        });
    });

    it('should return 400 for missing required fields', () => {
      return request(app.getHttpServer())
        .post('/citation')
        .send({ text: "C'est pas faux." })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 for empty text', () => {
      return request(app.getHttpServer())
        .post('/citation')
        .send({
          text: '',
          actorsId: [1],
          authorsId: [1],
          characterId: 1,
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 for empty actorsId array', () => {
      return request(app.getHttpServer())
        .post('/citation')
        .send({
          text: "C'est pas faux.",
          actorsId: [],
          authorsId: [1],
          characterId: 1,
        })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('PATCH /citation/:id', () => {
    it('should update a citation', () => {
      return request(app.getHttpServer())
        .patch('/citation/1')
        .send({ text: 'Updated citation' })
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body.text).toBe('Updated citation');
        });
    });
  });

  describe('DELETE /citation/:id', () => {
    it('should delete a citation', () => {
      return request(app.getHttpServer()).delete('/citation/1').expect(HttpStatus.NO_CONTENT);
    });
  });

  describe('POST /citation/:citationId/actor/:fieldId', () => {
    it('should associate an actor to a citation', () => {
      return request(app.getHttpServer()).post('/citation/1/actor/1').expect(HttpStatus.CREATED);
    });
  });

  describe('DELETE /citation/:citationId/actor/:fieldId', () => {
    it('should dissociate an actor from a citation', () => {
      return request(app.getHttpServer())
        .delete('/citation/1/actor/1')
        .expect(HttpStatus.NO_CONTENT);
    });
  });

  describe('POST /citation/:citationId/author/:fieldId', () => {
    it('should associate an author to a citation', () => {
      return request(app.getHttpServer()).post('/citation/1/author/1').expect(HttpStatus.CREATED);
    });
  });

  describe('DELETE /citation/:citationId/author/:fieldId', () => {
    it('should dissociate an author from a citation', () => {
      return request(app.getHttpServer())
        .delete('/citation/1/author/1')
        .expect(HttpStatus.NO_CONTENT);
    });
  });
});
