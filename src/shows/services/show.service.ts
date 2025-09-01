import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { ShowDto } from '../dto/show.dto';
import { updateShowDto } from '../dto/update-show.dto';
import { Show } from '../entities/show.entity';
import { FilterShowParams } from '../params/filter-show.params';
import { ShowRepository } from '../repositories/show.repository';
import { DatabaseExceptions } from '../../common/exceptions/database-exceptions.service';
import { ERROR_MESSAGES } from '../../common/exceptions/errors-messages.const';
import { PaginationResponse } from '../../common/pagination/pagination.response';

@Injectable()
export class ShowService {
  context = 'Show';

  constructor(
    private readonly showRepository: ShowRepository,
    private readonly databaseExceptions: DatabaseExceptions,
  ) {}

  async createShow(show: ShowDto): Promise<Show> {
    try {
      return await this.showRepository.create(show);
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }

  async deleteShow(id: number): Promise<DeleteResult> {
    try {
      const deleteResult = await this.showRepository.delete({
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

  async editShow(id: number, showDto: updateShowDto): Promise<Show> {
    try {
      const show = await this.showRepository.selectOneBy({ id });
      Object.assign(show, showDto);
      return await this.showRepository.update(show);
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }

  async getSpecificShow(id: number): Promise<Show> {
    try {
      return await this.showRepository.selectOneBy({ id });
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }

  async getAllShows(
    filters: FilterShowParams,
  ): Promise<PaginationResponse<Show>> {
    try {
      const [shows, total] = await this.showRepository.selectBy(filters);

      return {
        data: shows,
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
