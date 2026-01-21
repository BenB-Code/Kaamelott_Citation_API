import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AuthorController } from '../src/authors/controllers/author.controller';
import { AuthorService } from '../src/authors/services/author.service';
import { Author } from '../src/authors/entities/author.entity';

describe('AuthorController (e2e)', () => {
  let app: INestApplication<App>;

  const mockAuthor: Partial<Author> = {
    id: 1,
    firstName: 'Alexandre',
    lastName: 'Astier',
    picture: 'https://example.com/astier.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockAuthorService = {
    getAllAuthors: jest.fn().mockResolvedValue({
      data: [mockAuthor],
      meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
    }),
    getSpecificAuthor: jest.fn().mockResolvedValue(mockAuthor),
    createAuthor: jest.fn().mockResolvedValue(mockAuthor),
    editAuthor: jest.fn().mockResolvedValue({ ...mockAuthor, firstName: 'Alex' }),
    deleteAuthor: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthorController],
      providers: [
        {
          provide: AuthorService,
          useValue: mockAuthorService,
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

  describe('GET /author', () => {
    it('should return paginated authors', () => {
      return request(app.getHttpServer())
        .get('/author')
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body).toHaveProperty('data');
          expect(res.body).toHaveProperty('meta');
          expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    it('should accept pagination query params', () => {
      return request(app.getHttpServer()).get('/author?page=1&limit=10').expect(HttpStatus.OK);
    });
  });

  describe('GET /author/:id', () => {
    it('should return a specific author', () => {
      return request(app.getHttpServer())
        .get('/author/1')
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body.id).toBe(1);
          expect(res.body.firstName).toBe('Alexandre');
        });
    });

    it('should return 400 for invalid id', () => {
      return request(app.getHttpServer()).get('/author/invalid').expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('POST /author', () => {
    it('should create an author', () => {
      return request(app.getHttpServer())
        .post('/author')
        .send({ firstName: 'Alexandre', lastName: 'Astier' })
        .expect(HttpStatus.CREATED)
        .expect((res) => {
          expect(res.body.firstName).toBe('Alexandre');
        });
    });

    it('should return 400 for missing required fields', () => {
      return request(app.getHttpServer())
        .post('/author')
        .send({ firstName: 'Alexandre' })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 for empty firstName', () => {
      return request(app.getHttpServer())
        .post('/author')
        .send({ firstName: '', lastName: 'Astier' })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('PATCH /author/:id', () => {
    it('should update an author', () => {
      return request(app.getHttpServer())
        .patch('/author/1')
        .send({ firstName: 'Alex' })
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body.firstName).toBe('Alex');
        });
    });
  });

  describe('DELETE /author/:id', () => {
    it('should delete an author', () => {
      return request(app.getHttpServer()).delete('/author/1').expect(HttpStatus.NO_CONTENT);
    });
  });
});
