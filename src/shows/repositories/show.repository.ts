import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { FindShowDto } from '../dto/find-show.dto';
import { ShowDto } from '../dto/show.dto';
import { Show } from '../entities/show.entity';
import { FilterShowParams } from '../params/filter-show.params';

@Injectable()
export class ShowRepository {
  constructor(
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
  ) {}

  async create(show: ShowDto): Promise<Show> {
    return await this.showRepository.save(show);
  }

  async update(show: Show): Promise<Show> {
    return await this.showRepository.save(show);
  }

  async delete(criteria: FindShowDto): Promise<DeleteResult> {
    return await this.showRepository.delete(criteria);
  }

  async selectOneBy(filter: FindShowDto): Promise<Show> {
    const query = this.showRepository
      .createQueryBuilder('show')
      .select([
        'show.id',
        'show.name',
        'show.mediaType',
        'show.createdAt',
        'show.updatedAt',
      ]);

    if (filter.id) {
      query.andWhere(`show.id = :id`, {
        id: filter.id,
      });
    }
    if (filter.name) {
      query.andWhere(`LOWER(show."name") = LOWER(:name)`, {
        name: filter.name,
      });
    }
    if (filter.mediaType) {
      query.andWhere(`LOWER(show."mediaType") = LOWER(:mediaType)`, {
        mediaType: filter.mediaType,
      });
    }
    return await query.getOneOrFail();
  }

  async selectBy(filter: FilterShowParams): Promise<[Show[], number]> {
    const query = this.showRepository
      .createQueryBuilder('show')
      .select([
        'show.id',
        'show.name',
        'show.mediaType',
        'show.createdAt',
        'show.updatedAt',
      ]);

    if (filter.name) {
      query.andWhere(`LOWER(show."name") = LOWER(:name)`, {
        name: filter.name,
      });
    }
    if (filter.mediaType) {
      query.andWhere(`show."mediaType" = :mediaType`, {
        mediaType: filter.mediaType,
      });
    }
    if (filter.search) {
      query.andWhere(`(LOWER(show."name") ILIKE LOWER(:search))`, {
        search: `%${filter.search}%`,
      });
    }

    query.orderBy(`show.${filter.sortBy}`, filter.sortOrder);
    query.skip(filter.offset).take(filter.limit);

    return await query.getManyAndCount();
  }
}
