import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { Author } from '../entities/author.entity';
import { FilterAuthorParams } from '../params/filter-author.params';
import { AuthorRepository } from '../repositories/author.repository';
import { DatabaseExceptions, ERROR_MESSAGES } from '../../common/exceptions';
import { AuthorDto, UpdateAuthorDto } from '../dto';
import { PaginationResponse } from '../../common/pagination';

@Injectable()
export class AuthorService {
  context = 'Author';
  constructor(
    private readonly authorRepository: AuthorRepository,
    private readonly databaseExceptions: DatabaseExceptions,
  ) {}

  async createAuthor(author: AuthorDto): Promise<Author> {
    try {
      return await this.authorRepository.create(author);
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }

  async deleteAuthor(id: number): Promise<DeleteResult> {
    try {
      const deleteResult = await this.authorRepository.delete({
        id,
      });
      if (!deleteResult.affected) {
        this.databaseExceptions.handleDatabaseError(
          new NotFoundException(
            this.databaseExceptions.formatMessage(ERROR_MESSAGES.NO_DATA_FOUND, this.context),
          ),
        );
      }
      return deleteResult;
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }

  async editAuthor(id: number, authorDto: UpdateAuthorDto): Promise<Author> {
    try {
      const author = await this.authorRepository.selectOneBy({ id });
      Object.assign(author, authorDto);
      return await this.authorRepository.update(author);
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }

  async getSpecificAuthor(id: number): Promise<Author> {
    try {
      return await this.authorRepository.selectOneBy({ id });
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }

  async getAllAuthors(filters: FilterAuthorParams): Promise<PaginationResponse<Author>> {
    try {
      const [authors, total] = await this.authorRepository.selectBy(filters);

      return {
        data: authors,
        metadata: {
          limit: filters.limit,
          offset: filters.offset,
          total,
        },
      };
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }
}
