import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { ERROR_MESSAGES } from '../../common/exceptions/errors-messages.const';
import { CharacterDto } from '../dto/character.dto';
import { UpdateCharacterDto } from '../dto/update-character.dto';
import { FilterCharacterParams } from '../params/filter-character.params';
import { CharacterRepository } from '../repositories/character.repository';
import { CharacterActor } from '../types/character-actor.type';
import { DatabaseExceptions } from '../../common/exceptions/database-exceptions.service';
import { PaginationResponse } from '../../common/pagination/pagination.response';
import { Character } from '../entities/character.entity';

@Injectable()
export class CharacterService {
  context = 'Character';

  constructor(
    private readonly characterRepository: CharacterRepository,
    private readonly databaseExceptions: DatabaseExceptions,
  ) {}

  async createCharacter(character: CharacterDto): Promise<Character> {
    try {
      const createdCharacter = await this.characterRepository.create(character);
      if (character.actorId) {
        await this.characterRepository.associateCharacterActor({
          characterId: createdCharacter.id,
          actorId: character.actorId,
        });
      }
      return await this.characterRepository.selectOneBy({
        id: createdCharacter.id,
      });
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }

  async deleteCharacter(id: number): Promise<DeleteResult> {
    try {
      const deleteResult = await this.characterRepository.delete({
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

  async editCharacter(
    id: number,
    characterDto: UpdateCharacterDto,
  ): Promise<Character> {
    try {
      const character = await this.characterRepository.selectOneBy({ id });
      Object.assign(character, characterDto);
      return await this.characterRepository.update(character);
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }

  async getSpecificCharacter(id: number): Promise<Character> {
    try {
      return await this.characterRepository.selectOneBy({ id });
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }

  async getAllCharacters(
    filters: FilterCharacterParams,
  ): Promise<PaginationResponse<Character>> {
    try {
      const [characters, total] =
        await this.characterRepository.selectBy(filters);

      return {
        data: characters,
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

  async associateCharacterActor(ids: CharacterActor): Promise<void> {
    try {
      return await this.characterRepository.associateCharacterActor(ids);
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }

  async dissociateCharacterActor(ids: CharacterActor): Promise<void> {
    try {
      return await this.characterRepository.dissociateCharacterActor(ids);
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }
}
