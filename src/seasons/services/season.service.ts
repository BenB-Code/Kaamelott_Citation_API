import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { ERROR_MESSAGES } from '../../common/exceptions/errors-messages.const';
import { SeasonDto } from '../dto/season.dto';
import { UpdateSeasonDto } from '../dto/update-season.dto';
import { FilterSeasonParams } from '../params/filter-season.params';
import { SeasonRepository } from '../repositories/season.repository';
import { DatabaseExceptions } from '../../common/exceptions/database-exceptions.service';
import { PaginationResponse } from '../../common/pagination/pagination.response';
import { Season } from '../entities/season.entity';

@Injectable()
export class SeasonService {
  context = 'Season';

  constructor(
    private readonly seasonRepository: SeasonRepository,
    private readonly databaseExceptions: DatabaseExceptions,
  ) {}

  async createSeason(season: SeasonDto): Promise<Season> {
    try {
      const createdSeason = await this.seasonRepository.create(season);
      return await this.seasonRepository.selectOneBy({ id: createdSeason.id });
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }

  async deleteSeason(id: number): Promise<DeleteResult> {
    try {
      const deleteResult = await this.seasonRepository.delete({
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

  async editSeason(id: number, seasonDto: UpdateSeasonDto): Promise<Season> {
    try {
      const season = await this.seasonRepository.selectOneBy({ id });
      Object.assign(season, seasonDto);
      return await this.seasonRepository.update(season);
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }

  async getSpecificSeason(id: number): Promise<Season> {
    try {
      return await this.seasonRepository.selectOneBy({ id });
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }

  async getAllSeasons(
    filters: FilterSeasonParams,
  ): Promise<PaginationResponse<Season>> {
    try {
      const [seasons, total] = await this.seasonRepository.selectBy(filters);

      return {
        data: seasons,
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
