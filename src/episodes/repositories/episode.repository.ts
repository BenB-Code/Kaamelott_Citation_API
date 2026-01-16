import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { FilterEpisodeParams } from '../params/filter-episode.params';
import { Episode } from '../entities/episode.entity';
import { EpisodeDto, FindEpisodeDto } from '../dto';

@Injectable()
export class EpisodeRepository {
  constructor(
    @InjectRepository(Episode)
    private readonly episodeRepository: Repository<Episode>,
  ) {}

  async create(episode: EpisodeDto): Promise<Episode> {
    const newEpisode = this.episodeRepository.create({
      name: episode.name,
      number: episode.number,
      picture: episode.picture,
      season: { id: episode.seasonId },
    });
    return await this.episodeRepository.save(newEpisode);
  }

  async update(episode: Episode): Promise<Episode> {
    return await this.episodeRepository.save(episode);
  }

  async delete(criteria: FindEpisodeDto): Promise<DeleteResult> {
    return await this.episodeRepository.delete(criteria);
  }

  async selectOneBy(filter: FindEpisodeDto): Promise<Episode> {
    const query = this.episodeRepository
      .createQueryBuilder('episode')
      .leftJoinAndSelect('episode.season', 'season')
      .leftJoinAndSelect('season.show', 'show')
      .leftJoin('episode.citations', 'citation')
      .select([
        'episode.id',
        'episode.name',
        'episode.number',
        'episode.picture',
        'episode.createdAt',
        'episode.updatedAt',
        'season.id',
        'season.name',
        'show.id',
        'show.name',
        'citation.id',
      ]);

    if (filter.id) {
      query.andWhere(`episode.id = :id`, {
        id: filter.id,
      });
    }
    if (filter.seasonId) {
      query.andWhere(`season.id = :seasonId`, {
        seasonId: filter.seasonId,
      });
    }
    if (filter.name) {
      query.andWhere(`LOWER(episode.name) = LOWER(:name)`, {
        name: filter.name,
      });
    }
    if (filter.number) {
      query.andWhere(`episode.number = :number`, {
        number: filter.number,
      });
    }
    return await query.getOneOrFail();
  }

  async selectBy(filter: FilterEpisodeParams): Promise<[Episode[], number]> {
    const query = this.episodeRepository
      .createQueryBuilder('episode')
      .leftJoinAndSelect('episode.season', 'season')
      .leftJoinAndSelect('season.show', 'show')
      .leftJoin('episode.citations', 'citation')
      .select([
        'episode.id',
        'episode.name',
        'episode.number',
        'episode.picture',
        'episode.createdAt',
        'episode.updatedAt',
        'season.id',
        'season.name',
        'show.id',
        'show.name',
        'citation.id',
      ]);

    if (filter.seasonId) {
      query.andWhere(`season.id = :seasonId`, {
        seasonId: filter.seasonId,
      });
    }
    if (filter.name) {
      query.andWhere(`LOWER(episode.name) = LOWER(:name)`, {
        name: filter.name,
      });
    }
    if (filter.number) {
      query.andWhere(`episode.number = :number`, {
        number: filter.number,
      });
    }
    if (filter.search) {
      query.andWhere(`LOWER(episode.name) ILIKE LOWER(:search)`, {
        search: `%${filter.search}%`,
      });
    }

    query.orderBy(`episode.${filter.sortBy ?? ''}`, filter.sortOrder);
    query.skip(filter.offset).take(filter.limit);

    return await query.getManyAndCount();
  }
}
