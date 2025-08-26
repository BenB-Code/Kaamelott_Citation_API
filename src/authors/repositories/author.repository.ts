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

  async update() {}

  async delete(authorId: string): Promise<DeleteResult> {
    return await this.authorRepository.delete(authorId);
  }

  async select() {}
}
