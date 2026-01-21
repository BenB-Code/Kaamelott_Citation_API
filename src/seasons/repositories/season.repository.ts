import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { FilterSeasonParams } from '../params/filter-season.params';
import { Season } from '../entities/season.entity';
import { FindSeasonDto, SeasonDto } from '../dto';

@Injectable()
export class SeasonRepository {
  constructor(
    @InjectRepository(Season)
    private readonly seasonRepository: Repository<Season>,
  ) {}

  async create(season: SeasonDto): Promise<Season> {
    const newSeason = this.seasonRepository.create({
      name: season.name,
      picture: season.picture,
      show: { id: season.showId },
    });
    return await this.seasonRepository.save(newSeason);
  }

  async update(season: Season): Promise<Season> {
    return await this.seasonRepository.save(season);
  }

  async delete(criteria: FindSeasonDto): Promise<DeleteResult> {
    return await this.seasonRepository.delete(criteria);
  }

  async selectOneBy(filter: FindSeasonDto): Promise<Season> {
    const query = this.seasonRepository
      .createQueryBuilder('season')
      .leftJoinAndSelect('season.show', 'show')
      .leftJoin('season.episodes', 'episode')
      .select([
        'season.id',
        'season.name',
        'season.picture',
        'season.createdAt',
        'season.updatedAt',
        'show.id',
        'show.name',
        'episode.id',
      ]);

    if (filter.id) {
      query.andWhere(`season.id = :id`, {
        id: filter.id,
      });
    }
    if (filter.showId) {
      query.andWhere(`show.id = :showId`, {
        showId: filter.showId,
      });
    }
    if (filter.name) {
      query.andWhere(`LOWER(season.name) = LOWER(:name)`, {
        name: filter.name,
      });
    }
    return await query.getOneOrFail();
  }

  async selectBy(filter: FilterSeasonParams): Promise<[Season[], number]> {
    const query = this.seasonRepository
      .createQueryBuilder('season')
      .leftJoinAndSelect('season.show', 'show')
      .leftJoin('season.episodes', 'episode')
      .select([
        'season.id',
        'season.name',
        'season.picture',
        'season.createdAt',
        'season.updatedAt',
        'show.id',
        'show.name',
        'episode.id',
      ]);

    if (filter.showId) {
      query.andWhere(`show.id = :showId`, {
        showId: filter.showId,
      });
    }
    if (filter.name) {
      query.andWhere(`LOWER(season.name) = LOWER(:name)`, {
        name: filter.name,
      });
    }
    if (filter.search) {
      query.andWhere(`LOWER(season.name) ILIKE LOWER(:search)`, {
        search: `%${filter.search}%`,
      });
    }

    query.orderBy(`season.${filter.sortBy ?? ''}`, filter.sortOrder);
    query.skip(filter.offset).take(filter.limit);

    return await query.getManyAndCount();
  }
}
