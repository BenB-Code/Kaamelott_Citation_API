import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { AuthorDto } from '../dto/author.dto';
import { Author } from '../entities/author.entity';
import { FilterAuthorParams } from '../params/filter-author.params';

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

  async selectBy(filter: FilterAuthorParams): Promise<[Author[], number]> {
    const query = this.authorRepository.createQueryBuilder('author');

    if (filter.firstName) {
      query.andWhere(`LOWER(author."firstName") = LOWER(:firstName)`, {
        firstName: filter.firstName,
      });
    }
    if (filter.lastName) {
      query.andWhere(`LOWER(author."lastName") = LOWER(:lastName)`, {
        lastName: filter.lastName,
      });
    }
    if (filter.search) {
      query.andWhere(
        `(LOWER(author."firstName") ILIKE LOWER(:search) OR LOWER(author."lastName") ILIKE LOWER(:search))`,
        { search: `%${filter.search}%` },
      );
    }

    query.orderBy(`author.${filter.sortBy}`, filter.sortOrder);
    query.skip(filter.offset).take(filter.limit);

    return query.getManyAndCount();
  }
}
