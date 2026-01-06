import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { DatabaseExceptions } from './database-exceptions.service';
import { Author } from '../../authors/entities/author.entity';

describe('DatabaseExceptions', () => {
  let databaseExceptions: DatabaseExceptions;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseExceptions],
    }).compile();

    databaseExceptions = module.get<DatabaseExceptions>(DatabaseExceptions);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(databaseExceptions).toBeDefined();
  });

  describe('formatMessage', () => {
    it('should format simple empty string without context', () => {
      const result = databaseExceptions.formatMessage('');

      expect(result).toBe('');
    });

    it('should format simple text without context', () => {
      const result = databaseExceptions.formatMessage('This is my tested text');

      expect(result).toBe('This is my tested text');
    });

    it('should format simple text with context', () => {
      const result = databaseExceptions.formatMessage(
        'This is my tested text',
        'TestDatabaseExceptions',
      );

      expect(result).toBe('(TestDatabaseExceptions)This is my tested text');
    });
  });

  describe('handleDatabaseError', () => {
    describe('HttpException', () => {
      it('HttpException should be throw as is', () => {
        const errorMessage = 'Test BAD REQUEST error message';
        const errorOptions = {
          description: 'Option description',
          cause: 'Test',
        };
        const error = new HttpException(errorMessage, HttpStatus.BAD_REQUEST, errorOptions);
        try {
          databaseExceptions.handleDatabaseError(error);
        } catch (error) {
          expect(error).toBeInstanceOf(HttpException);
          expect(error.status).toBe(400);
          expect(error.response).toBe(errorMessage);
          expect(error.options).toEqual(errorOptions);
        }
      });
    });

    describe('QueryFailedError', () => {
      const getError = (code) =>
        new QueryFailedError('', [], {
          code,
        } as any);

      it('should throw NotFoundException, NO_DATA_FOUND', () => {
        try {
          databaseExceptions.handleDatabaseError(getError('02000'));
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.status).toBe(404);
          expect(error.response.message).toBe(
            '[NO_DATA_FOUND] Cannot perform operation: Data not found.',
          );
        }
      });
      it('should throw BadRequestException, TOO_LONG_STRING', () => {
        try {
          databaseExceptions.handleDatabaseError(getError('22001'));
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect(error.status).toBe(400);
          expect(error.response.message).toBe(
            '[TOO_LONG_STRING] Cannot perform operation: Too long string',
          );
        }
      });
      it('should throw BadRequestException, NUM_OUT_OF_RANGE', () => {
        try {
          databaseExceptions.handleDatabaseError(getError('22003'));
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect(error.status).toBe(400);
          expect(error.response.message).toBe(
            '[NUM_OUT_OF_RANGE] Cannot perform operation: Date in a wrong format',
          );
        }
      });
      it('should throw BadRequestException, INVALID_DATETIME_FORMAT', () => {
        try {
          databaseExceptions.handleDatabaseError(getError('22007'));
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect(error.status).toBe(400);
          expect(error.response.message).toBe(
            '[INVALID_DATETIME_FORMAT] Cannot perform operation: ',
          );
        }
      });
      it('should throw BadRequestException, RESTRICT_VIOLATION', () => {
        try {
          databaseExceptions.handleDatabaseError(getError('23001'));
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect(error.status).toBe(400);
          expect(error.response.message).toBe(
            '[RESTRICT_VIOLATION] Cannot perform operation: resource has dependent records',
          );
        }
      });
      it('should throw BadRequestException, NOT_NULL_VIOLATION', () => {
        try {
          databaseExceptions.handleDatabaseError(getError('23502'));
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect(error.status).toBe(400);
          expect(error.response.message).toBe(
            '[NOT_NULL_VIOLATION] Cannot perform operation: Missing required data',
          );
        }
      });
      it('should throw BadRequestException, FK_VIOLATION', () => {
        try {
          databaseExceptions.handleDatabaseError(getError('23503'));
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect(error.status).toBe(400);
          expect(error.response.message).toBe(
            '[FK_VIOLATION] Cannot perform operation: related data exists',
          );
        }
      });
      it('should throw BadRequestException, UNIQUE_VIOLATION', () => {
        try {
          databaseExceptions.handleDatabaseError(getError('23505'));
        } catch (error) {
          expect(error).toBeInstanceOf(ConflictException);
          expect(error.status).toBe(409);
          expect(error.response.message).toBe(
            '[UNIQUE_VIOLATION] Cannot perform operation: Resource already exists',
          );
        }
      });

      it('should throw InternalServerErrorException, OPERATION_FAILED', () => {
        try {
          databaseExceptions.handleDatabaseError(getError('12345'));
        } catch (error) {
          expect(error).toBeInstanceOf(InternalServerErrorException);
          expect(error.status).toBe(500);
          expect(error.response.message).toBe(
            '[OPERATION_FAILED] Cannot perform operation: Database operation failed',
          );
        }
      });
    });

    describe('QueryFailedError', () => {
      it('should throw NotFoundException, NO_DATA_FOUND', () => {
        try {
          databaseExceptions.handleDatabaseError(new EntityNotFoundError(Author, { id: 12345 }));
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.status).toBe(404);
          expect(error.response.message).toBe(
            '[NO_DATA_FOUND] Cannot perform operation: Data not found.',
          );
        }
      });
    });

    describe('InternalServerErrorException', () => {
      it('should throw InternalServerErrorException, no message specified', () => {
        try {
          databaseExceptions.handleDatabaseError('Test');
        } catch (error) {
          expect(error).toBeInstanceOf(InternalServerErrorException);
          expect(error.status).toBe(500);
          expect(error.message).toContain(
            '[OPERATION_FAILED] Cannot perform operation: Database operation failed',
          );
        }
      });

      it('should throw InternalServerErrorException, specific message', () => {
        try {
          databaseExceptions.handleDatabaseError(new Error('Error test message'));
        } catch (error) {
          expect(error).toBeInstanceOf(InternalServerErrorException);
          expect(error.status).toBe(500);
          expect(error.message).toContain('Error test message');
        }
      });
    });
  });
});
