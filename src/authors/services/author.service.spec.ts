import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { QueryFailedError } from 'typeorm';
import { AuthorDto } from '../dto/author.dto';
import { Author } from '../entities/author.entity';
import { DatabaseExceptions } from './../../common/exceptions/database-exceptions.service';
import { AuthorRepository } from './../repositories/author.repository';
import { AuthorService } from './author.service';

describe('AuthorService', () => {
  let authorService: AuthorService;
  let authorRepository: AuthorRepository;

  const mockAuthorDto: AuthorDto = {
    firstName: 'Jhon',
    lastName: 'Doe',
    picture: './path/to/my/profile-picture.png',
  };
  const mockAuthor = {
    id: 12,
    ...mockAuthorDto,
    createdAt: new Date('08-26-2025'),
    updatedAt: new Date('08-26-2025'),
  } as Author;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorService,
        {
          provide: AuthorRepository,
          useValue: {
            create: jest.fn(),
            delete: jest.fn(),
          },
        },
        DatabaseExceptions,
      ],
    }).compile();

    authorService = module.get<AuthorService>(AuthorService);
    authorRepository = module.get<AuthorRepository>(AuthorRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authorService).toBeDefined();
  });

  describe('createAuthor', () => {
    it('should create the author', async () => {
      (authorRepository.create as jest.Mock).mockResolvedValue(mockAuthor);

      const result = await authorService.createAuthor(mockAuthorDto);

      expect(result).toEqual(mockAuthor);
      expect(authorRepository.create).toHaveBeenCalledTimes(1);
      expect(authorRepository.create).toHaveBeenCalledWith(mockAuthorDto);
    });

    it('should throw: [UNIQUE_VIOLATION]', async () => {
      const mockError = new QueryFailedError('', [], {
        code: '23505',
      } as any);
      (authorRepository.create as jest.Mock).mockRejectedValue(mockError);

      try {
        await authorService.createAuthor(mockAuthorDto);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.response.message).toBe(
          '(Author)[UNIQUE_VIOLATION] Cannot perform operation: Resource already exists',
        );
        expect(error.response.statusCode).toEqual(409);
      }
    });
  });

  describe('deleteAuthor', () => {
    it('should delete the author', async () => {
      (authorRepository.delete as jest.Mock).mockResolvedValue({
        raw: [],
        affected: 1,
      });

      const result = await authorService.deleteAuthor('12345');

      expect(result).toEqual({
        raw: [],
        affected: 1,
      });
    });

    it('should throw: [NO_DATA_FOUND]', async () => {
      (authorRepository.delete as jest.Mock).mockResolvedValue({
        raw: [],
        affected: 0,
      });

      try {
        await authorService.deleteAuthor('12345');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.status).toBe(404);
        expect(error.response.message).toBe(
          '(Author)[NO_DATA_FOUND] Cannot perform operation: Data not found.',
        );
      }
    });

    it('should throw exception as is', async () => {
      (authorRepository.delete as jest.Mock).mockRejectedValue(
        new InternalServerErrorException(),
      );

      try {
        await authorService.deleteAuthor('12345');
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.status).toBe(500);
        expect(error.response.message).toBe('Internal Server Error');
      }
    });
  });
});
