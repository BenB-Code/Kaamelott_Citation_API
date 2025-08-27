import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { AuthorDto } from '../dto/author.dto';
import { Author } from '../entities/author.entity';
import { DatabaseExceptions } from './../../common/exceptions/database-exceptions.service';
import { AuthorRepository } from './../repositories/author.repository';
import { AuthorService } from './author.service';

describe('AuthorService', () => {
  let authorService: AuthorService;
  let authorRepository: AuthorRepository;

  const mockAuthorDto: AuthorDto = {
    firstName: 'John',
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
            update: jest.fn(),
            selectOneBy: jest.fn(),
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
      await authorService.createAuthor(mockAuthorDto);

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
      expect(authorRepository.delete).toHaveBeenCalledTimes(1);
      expect(authorRepository.delete).toHaveBeenCalledWith('12345');
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
  });

  describe('editAuthor', () => {
    it('should return updated author', async () => {
      (authorRepository.selectOneBy as jest.Mock).mockResolvedValue(mockAuthor);

      await authorService.editAuthor(`${mockAuthor.id}`, {
        firstName: 'Tested',
      });

      expect(authorRepository.update).toHaveBeenCalledTimes(1);
      expect(authorRepository.update).toHaveBeenCalledWith({
        ...mockAuthor,
        firstName: 'Tested',
      });
    });

    it('should throw: [NO_DATA_FOUND]', async () => {
      (authorRepository.selectOneBy as jest.Mock).mockRejectedValue(
        new EntityNotFoundError(Author, { id: 12345 }),
      );

      try {
        await authorService.editAuthor('12345', mockAuthorDto);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.status).toBe(404);
        expect(error.response.message).toBe(
          '(Author)[NO_DATA_FOUND] Cannot perform operation: Data not found.',
        );
      }
    });
  });

  describe('getSpecificAuthorAuthor', () => {
    it('should return the author', async () => {
      await authorService.getSpecificAuthor('1');

      expect(authorRepository.selectOneBy).toHaveBeenCalledTimes(1);
      expect(authorRepository.selectOneBy).toHaveBeenCalledWith({ id: +'1' });
    });

    it('should throw: [NO_DATA_FOUND]', async () => {
      (authorRepository.selectOneBy as jest.Mock).mockRejectedValue(
        new EntityNotFoundError(Author, { id: 12345 }),
      );

      try {
        await authorService.getSpecificAuthor('12345');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.status).toBe(404);
        expect(error.response.message).toBe(
          '(Author)[NO_DATA_FOUND] Cannot perform operation: Data not found.',
        );
      }
    });
  });
});
