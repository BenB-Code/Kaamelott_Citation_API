import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { ERROR_MESSAGES } from '../../common/exceptions/errors-messages.const';
import { EpisodeDto } from '../dto/episode.dto';
import { UpdateEpisodeDto } from '../dto/update-episode.dto';
import { FilterEpisodeParams } from '../params/filter-episode.params';
import { EpisodeRepository } from '../repositories/episode.repository';
import { DatabaseExceptions } from '../../common/exceptions/database-exceptions.service';
import { PaginationResponse } from '../../common/pagination/pagination.response';
import { Episode } from '../entities/episode.entity';

@Injectable()
export class EpisodeService {
  context = 'Episode';

  constructor(
    private readonly episodeRepository: EpisodeRepository,
    private readonly databaseExceptions: DatabaseExceptions,
  ) {}

  async createEpisode(episode: EpisodeDto): Promise<Episode> {
    try {
      return await this.episodeRepository.create(episode);
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }

  async deleteEpisode(id: number): Promise<DeleteResult> {
    try {
      const deleteResult = await this.episodeRepository.delete({
        id,
      });
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

  async editEpisode(
    id: number,
    episodeDto: UpdateEpisodeDto,
  ): Promise<Episode> {
    try {
      const episode = await this.episodeRepository.selectOneBy({ id });
      Object.assign(episode, episodeDto);
      return await this.episodeRepository.update(episode);
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }

  async getSpecificEpisode(id: number): Promise<Episode> {
    try {
      return await this.episodeRepository.selectOneBy({ id });
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }

  async getAllEpisodes(
    filters: FilterEpisodeParams,
  ): Promise<PaginationResponse<Episode>> {
    try {
      const [episodes, total] = await this.episodeRepository.selectBy(filters);

      return {
        data: episodes,
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
