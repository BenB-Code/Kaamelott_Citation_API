import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CharacterDto } from '../dto/character.dto';
import { FindCharacterDto } from '../dto/find-character.dto';
import { Character } from '../entities/character.entity';
import { FilterCharacterParams } from '../params/filter-character.params';
import { CharacterActor } from '../types/character-actor.type';

@Injectable()
export class CharacterRepository {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
  ) {}

  async create(character: CharacterDto): Promise<Character> {
    return await this.characterRepository.save(character);
  }

  async update(character: Character): Promise<Character> {
    return await this.characterRepository.save(character);
  }

  async delete(criteria: FindCharacterDto): Promise<DeleteResult> {
    return await this.characterRepository.delete(criteria);
  }

  async selectOneBy(filter: FindCharacterDto): Promise<Character> {
    const query = this.characterRepository
      .createQueryBuilder('character')
      .leftJoin('character.citations', 'citation')
      .leftJoin('character.actors', 'actor')
      .select([
        'character.id',
        'character.name',
        'character.picture',
        'character.createdAt',
        'character.updatedAt',
        'citation.id',
        'actor.id',
      ]);

    if (filter.id) {
      query.andWhere(`character.id = :id`, {
        id: filter.id,
      });
    }
    if (filter.name) {
      query.andWhere(`LOWER(character."name") = LOWER(:name)`, {
        name: filter.name,
      });
    }
    return await query.getOneOrFail();
  }

  async selectBy(filter: FilterCharacterParams): Promise<[Character[], number]> {
    const query = this.characterRepository
      .createQueryBuilder('character')
      .leftJoin('character.citations', 'citation')
      .leftJoin('character.actors', 'actor')
      .select([
        'character.id',
        'character.name',
        'character.picture',
        'character.createdAt',
        'character.updatedAt',
        'citation.id',
        'actor.id',
      ]);

    if (filter.name) {
      query.andWhere(`LOWER(character."name") = LOWER(:name)`, {
        name: filter.name,
      });
    }
    if (filter.search) {
      query.andWhere(`LOWER(character."name") ILIKE LOWER(:search)`, {
        search: `%${filter.search}%`,
      });
    }

    query.orderBy(`character.${filter.sortBy ?? ''}`, filter.sortOrder);
    query.skip(filter.offset).take(filter.limit);

    return await query.getManyAndCount();
  }

  async associateCharacterActor(ids: CharacterActor): Promise<void> {
    await this.characterRepository
      .createQueryBuilder()
      .relation(Character, 'actors')
      .of(ids.characterId)
      .add(ids.actorId);
  }

  async dissociateCharacterActor(ids: CharacterActor): Promise<void> {
    await this.characterRepository
      .createQueryBuilder()
      .relation(Character, 'actors')
      .of(ids.characterId)
      .remove(ids.actorId);
  }
}
