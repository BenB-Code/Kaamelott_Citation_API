import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { AuthorDto } from '../dto/author.dto';
import { Author } from '../entities/author.entity';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(author: AuthorDto): Promise<Author> {
    return await this.authorRepository.save(author);
  }

  async update(author: Author): Promise<Author> {
    return await this.authorRepository.save(author);
  }

  async delete(authorId: string): Promise<DeleteResult> {
    return await this.authorRepository.delete(authorId);
  }

  async selectOneBy(filter: object): Promise<Author> {
    return await this.authorRepository.findOneByOrFail(filter);
  }

  async selectBy(filters: object): Promise<Author[]> {
    return await this.authorRepository.findBy(filters);
  }
}
