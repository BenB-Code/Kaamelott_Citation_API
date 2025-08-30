import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ActorDto } from '../dto/actor.dto';
import { FindActorDto } from '../dto/find-actor.dto';
import { Actor } from '../entities/actor.entity';
import { FilterActorParams } from '../params/filter-actor.params';

@Injectable()
export class ActorRepository {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
  ) {}

  async create(actor: ActorDto): Promise<Actor> {
    return await this.actorRepository.save(actor);
  }

  async update(actor: Actor): Promise<Actor> {
    return await this.actorRepository.save(actor);
  }

  async delete(criteria: FindActorDto): Promise<DeleteResult> {
    return await this.actorRepository.delete(criteria);
  }

  async selectOneBy(filter: FindActorDto): Promise<Actor> {
    const query = this.actorRepository
      .createQueryBuilder('actor')
      .leftJoin('actor.citations', 'citation')
      .leftJoin('actor.characters', 'character')
      .select([
        'actor.id',
        'actor.firstName',
        'actor.lastName',
        'actor.picture',
        'actor.createdAt',
        'actor.updatedAt',
        'citation.id',
        'character.id',
        'character.name',
      ]);

    if (filter.id) {
      query.andWhere(`actor.id = :id`, {
        id: filter.id,
      });
    }
    if (filter.firstName) {
      query.andWhere(`LOWER(actor."firstName") = LOWER(:firstName)`, {
        firstName: filter.firstName,
      });
    }
    if (filter.lastName) {
      query.andWhere(`LOWER(actor."lastName") = LOWER(:lastName)`, {
        lastName: filter.lastName,
      });
    }
    return await query.getOneOrFail();
  }

  async selectBy(filter: FilterActorParams): Promise<[Actor[], number]> {
    const query = this.actorRepository
      .createQueryBuilder('actor')
      .leftJoin('actor.citations', 'citation')
      .leftJoin('actor.characters', 'character')
      .select([
        'actor.id',
        'actor.firstName',
        'actor.lastName',
        'actor.picture',
        'actor.createdAt',
        'actor.updatedAt',
        'citation.id',
        'character.id',
        'character.name',
      ]);

    if (filter.firstName) {
      query.andWhere(`LOWER(actor."firstName") = LOWER(:firstName)`, {
        firstName: filter.firstName,
      });
    }
    if (filter.lastName) {
      query.andWhere(`LOWER(actor."lastName") = LOWER(:lastName)`, {
        lastName: filter.lastName,
      });
    }
    if (filter.search) {
      query.andWhere(
        `(LOWER(actor."firstName") ILIKE LOWER(:search) OR LOWER(actor."lastName") ILIKE LOWER(:search))`,
        { search: `%${filter.search}%` },
      );
    }

    query.orderBy(`actor.${filter.sortBy}`, filter.sortOrder);
    query.skip(filter.offset).take(filter.limit);

    return await query.getManyAndCount();
  }
}
