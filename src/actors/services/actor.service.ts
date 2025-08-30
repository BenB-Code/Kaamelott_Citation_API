import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { ERROR_MESSAGES } from '../../common/exceptions/errors-messages.const';
import { ActorDto } from '../dto/actor.dto';
import { UpdateActorDto } from '../dto/update-actor.dto';
import { FilterActorParams } from '../params/filter-actor.params';
import { ActorRepository } from '../repositories/actor.repository';
import { DatabaseExceptions } from './../../common/exceptions/database-exceptions.service';
import { PaginationResponse } from './../../common/pagination/pagination.response';
import { Actor } from './../entities/actor.entity';

@Injectable()
export class ActorService {
  context = 'Actor';
  constructor(
    private readonly actorRepository: ActorRepository,
    private readonly databaseExceptions: DatabaseExceptions,
  ) {}

  async createActor(actor: ActorDto): Promise<Actor> {
    try {
      return await this.actorRepository.create(actor);
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }

  async deleteActor(id: number): Promise<DeleteResult> {
    try {
      const deleteResult = await this.actorRepository.delete({
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

  async editActor(id: number, actorDto: UpdateActorDto): Promise<Actor> {
    try {
      const actor = await this.actorRepository.selectOneBy({ id });
      Object.assign(actor, actorDto);
      return await this.actorRepository.update(actor);
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }

  async getSpecificActor(id: number): Promise<Actor> {
    try {
      return await this.actorRepository.selectOneBy({ id });
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }

  async getAllActors(
    filters: FilterActorParams,
  ): Promise<PaginationResponse<Actor>> {
    try {
      const [actors, total] = await this.actorRepository.selectBy(filters);

      return {
        data: actors,
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
