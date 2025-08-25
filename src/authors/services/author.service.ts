import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { AuthorDto } from '../dto/author.dto';
import { Author } from '../entities/author.entity';
import { AuthorRepository } from '../repositories/author.repository';
import { ERROR_MESSAGES } from '../../common/exceptions/errors-messages.const';
import { DatabaseExceptions } from './../../common/exceptions/database-exceptions.service';
@Injectable()
export class AuthorService {
  context = 'Author';
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: AuthorRepository,
    private readonly databaseExceptions: DatabaseExceptions,
  ) {}

  async createAuthor(author: AuthorDto): Promise<Author> {
    try {
      return await this.authorRepository.insert(author);
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }

  async deleteAuthor(authorId: string): Promise<DeleteResult> {
    try {
      const deleteResult = await this.authorRepository.delete(authorId);
      if (!deleteResult.affected) {
        this.databaseExceptions.handleDatabaseError(
          new NotFoundException(
            this.databaseExceptions.formatMessage(
              ERROR_MESSAGES.NO_DATA_FOUND,
              this.context,
            ),
          ),
        );
      }
      return deleteResult;
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }
}
