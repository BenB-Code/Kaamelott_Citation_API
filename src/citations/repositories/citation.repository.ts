import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Citation } from '../entities/citation.entity';
import { DeleteResult, Repository, DeepPartial } from 'typeorm';
import { CitationDto } from '../dto/citation.dto';
import { FindCitationDto } from '../dto/find-citation.dto';
import { FilterCitationParams } from '../params/filter-citation.params';
import { CitationWithField } from '../types/citation-with-field.type';

@Injectable()
export class CitationRepository {
  constructor(
    @InjectRepository(Citation)
    private readonly citationRepository: Repository<Citation>,
  ) {}

  async create(citation: CitationDto): Promise<Citation> {
    return await this.citationRepository.save({
      text: citation.text,
      character: { id: citation.characterId },
      episode: citation.episodeId ? { id: citation.episodeId } : null,
      movie: citation.movieId ? { id: citation.movieId } : null,
    } as DeepPartial<Citation>);
  }

  async update(citation: Citation): Promise<Citation> {
    return await this.citationRepository.save(citation);
  }

  async delete(criteria: FindCitationDto): Promise<DeleteResult> {
    return await this.citationRepository.delete(criteria);
  }

  async selectOneBy(filter: FindCitationDto): Promise<Citation> {
    return await this.citationRepository.findOneOrFail({
      where: filter,
      relations: {
        episode: {
          season: {
            show: true,
          },
        },
        movie: {
          show: true,
        },
        character: {
          actors: true,
        },
        actors: true,
        authors: true,
      },
    });
  }

  async selectBy(filter: FilterCitationParams): Promise<[Citation[], number]> {
    const { limit, offset, search, sortOrder, sortBy, ...filters } = filter;

    const queryBuilder = this.citationRepository
      .createQueryBuilder('citation')
      .leftJoinAndSelect('citation.episode', 'episode')
      .leftJoinAndSelect('episode.season', 'season')
      .leftJoinAndSelect('season.show', 'episodeShow')
      .leftJoinAndSelect('citation.movie', 'movie')
      .leftJoinAndSelect('movie.show', 'movieShow')
      .leftJoinAndSelect('citation.character', 'character')
      .leftJoinAndSelect('character.actors', 'characterActors')
      .leftJoinAndSelect('citation.actors', 'citationActors')
      .leftJoinAndSelect('citation.authors', 'authors');

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryBuilder.andWhere(`citation.${key} = :${key}`, { [key]: value });
      }
    });

    if (search) {
      queryBuilder.andWhere(
        `(LOWER(citation.text) ILIKE LOWER(:search)
          OR LOWER(character.name) ILIKE LOWER(:search)
          OR LOWER(citationActors.firstName) ILIKE LOWER(:search)
          OR LOWER(citationActors.lastName) ILIKE LOWER(:search)
          OR LOWER(authors.firstName) ILIKE LOWER(:search)
          OR LOWER(authors.lastName) ILIKE LOWER(:search)
          OR LOWER(episode.name) ILIKE LOWER(:search)
          OR LOWER(movie.name) ILIKE LOWER(:search)
          OR LOWER(episodeShow.name) ILIKE LOWER(:search)
          OR LOWER(movieShow.name) ILIKE LOWER(:search))`,
        { search: `%${search}%` },
      );
    }

    const sortByMapping: Record<string, string> = {
      characterId: 'character.id',
      episodeId: 'episode.id',
      movieId: 'movie.id',
      citationId: 'citation.id',
      createdAt: 'citation.createdAt',
      updatedAt: 'citation.updatedAt',
    };

    const sortField = sortByMapping[sortBy] || `citation.${sortBy}`;

    return await queryBuilder
      .orderBy(sortField, sortOrder)
      .skip(offset)
      .take(limit)
      .getManyAndCount();
  }

  async associateCitationWithField(ids: CitationWithField, tableName: string): Promise<void> {
    await this.citationRepository
      .createQueryBuilder()
      .relation(Citation, tableName)
      .of(ids.citationId)
      .add(ids.fieldId);
  }

  async dissociateCitationWithField(ids: CitationWithField, fieldName: string): Promise<void> {
    await this.citationRepository
      .createQueryBuilder()
      .relation(Citation, fieldName)
      .of(ids.citationId)
      .remove(ids.fieldId);
  }
}
