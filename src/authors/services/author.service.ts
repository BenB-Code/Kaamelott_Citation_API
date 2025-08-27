import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { ERROR_MESSAGES } from '../../common/exceptions/errors-messages.const';
import { AuthorDto } from '../dto/author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { Author } from '../entities/author.entity';
import { AuthorRepository } from '../repositories/author.repository';
import { DatabaseExceptions } from './../../common/exceptions/database-exceptions.service';
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

  async editAuthor(id: string, authorDto: UpdateAuthorDto): Promise<Author> {
    try {
      const author = await this.authorRepository.selectOneBy({ id: +id });
      Object.assign(author, authorDto);
      console.log(author);
      return await this.authorRepository.update(author);
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }
}
