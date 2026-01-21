import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Actor } from '../entities/actor.entity';
import { FilterActorParams } from '../params/filter-actor.params';
import { ActorRepository } from './actor.repository';
import { ActorDto } from '../dto';

describe('ActorRepository', () => {
  let actorRepository: ActorRepository;
  let repository: Partial<Repository<Actor>>;

  const mockActorDto: ActorDto = {
    firstName: 'Alexandre',
    lastName: 'Astier',
    picture: 'path/to/picture',
  };
  const mockActor = {
    id: 12,
    ...mockActorDto,
    createdAt: new Date('08-26-2025'),
    updatedAt: new Date('08-26-2025'),
  } as Actor;

  const mockQueryBuilder = {
    andWhere: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn(),
    leftJoin: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    getOneOrFail: jest.fn(),
  } as unknown as SelectQueryBuilder<Actor>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActorRepository,
        {
          provide: getRepositoryToken(Actor),
          useValue: {
            save: jest.fn(),
            delete: jest.fn(),
            findOneByOrFail: jest.fn(),
            findBy: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
          },
        },
      ],
    }).compile();

    actorRepository = module.get<ActorRepository>(ActorRepository);
    repository = module.get<Partial<Repository<Actor>>>(getRepositoryToken(Actor));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(actorRepository).toBeDefined();
  });

  it('should call create', async () => {
    await actorRepository.create(mockActorDto);

    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(repository.save).toHaveBeenCalledWith(mockActorDto);
  });

  it('should call delete', async () => {
    await actorRepository.delete({ id: mockActor.id });

    expect(repository.delete).toHaveBeenCalledTimes(1);
    expect(repository.delete).toHaveBeenCalledWith({ id: mockActor.id });
  });

  it('should call update', async () => {
    await actorRepository.update(mockActor);

    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(repository.save).toHaveBeenCalledWith(mockActor);
  });

  it('should call selectOneBy', async () => {
    mockQueryBuilder.getOneOrFail = jest.fn().mockResolvedValue(mockActor);

    const result = await actorRepository.selectOneBy({
      firstName: 'Alexandre',
      lastName: 'Astier',
      id: 12,
    });

    expect(repository.createQueryBuilder).toHaveBeenCalledWith('actor');
    expect(mockQueryBuilder.leftJoin).toHaveBeenCalledWith('actor.citations', 'citation');
    expect(mockQueryBuilder.leftJoin).toHaveBeenCalledWith('actor.characters', 'character');
    expect(mockQueryBuilder.select).toHaveBeenCalledWith([
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
    expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
      `LOWER(actor."firstName") = LOWER(:firstName)`,
      { firstName: 'Alexandre' },
    );
    expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
      `LOWER(actor."lastName") = LOWER(:lastName)`,
      { lastName: 'Astier' },
    );
    expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`actor.id = :id`, {
      id: 12,
    });
    expect(result).toEqual(mockActor);
  });

  describe('selectBy', () => {
    const mockActors = [mockActor];
    const mockCount = 1;

    beforeEach(() => {
      jest.clearAllMocks();
      mockQueryBuilder.getManyAndCount = jest.fn().mockResolvedValue([mockActors, mockCount]);
    });

    it('should handle complex filters and query building', async () => {
      const complexFilters = {
        firstName: 'Alexandre',
        lastName: 'Astier',
        search: 'test',
        limit: 20,
        offset: 10,
        sortBy: 'firstName',
        sortOrder: 'DESC',
      } as FilterActorParams;

      const result = await actorRepository.selectBy(complexFilters);

      expect(repository.createQueryBuilder).toHaveBeenCalledTimes(1);
      expect(repository.createQueryBuilder).toHaveBeenCalledWith('actor');
      expect(mockQueryBuilder.leftJoin).toHaveBeenCalledWith('actor.citations', 'citation');
      expect(mockQueryBuilder.leftJoin).toHaveBeenCalledWith('actor.characters', 'character');
      expect(mockQueryBuilder.select).toHaveBeenCalledWith([
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

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        `LOWER(actor."firstName") = LOWER(:firstName)`,
        { firstName: complexFilters.firstName },
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        `LOWER(actor."lastName") = LOWER(:lastName)`,
        { lastName: complexFilters.lastName },
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        `(LOWER(actor."firstName") ILIKE LOWER(:search) OR LOWER(actor."lastName") ILIKE LOWER(:search))`,
        { search: `%${complexFilters.search}%` },
      );

      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
        `actor.${complexFilters.sortBy}`,
        complexFilters.sortOrder,
      );
      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(complexFilters.offset);
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(complexFilters.limit);
      expect(result).toEqual([mockActors, mockCount]);
    });

    it('should handle empty filters with pagination only', async () => {
      const emptyFilters = {
        limit: 100,
        offset: 0,
        sortBy: 'createdAt',
        sortOrder: 'DESC',
      } as FilterActorParams;

      await actorRepository.selectBy(emptyFilters);

      expect(mockQueryBuilder.andWhere).not.toHaveBeenCalled();
      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
        `actor.${emptyFilters.sortBy}`,
        emptyFilters.sortOrder,
      );
      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(emptyFilters.offset);
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(emptyFilters.limit);
    });

    it('should return empty result when no actors found', async () => {
      const basicFilters = {
        limit: 10,
        offset: 0,
        sortBy: 'id',
        sortOrder: 'ASC',
      } as FilterActorParams;
      mockQueryBuilder.getManyAndCount = jest.fn().mockResolvedValue([[], 0]);

      const result = await actorRepository.selectBy(basicFilters);

      expect(result).toEqual([[], 0]);
    });

    it('should handle undefined sortBy with default empty string', async () => {
      const filtersWithoutSortBy = {
        limit: 10,
        offset: 0,
        sortBy: undefined,
        sortOrder: 'ASC',
      } as FilterActorParams;

      await actorRepository.selectBy(filtersWithoutSortBy);

      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith('actor.', 'ASC');
    });

    it('should properly construct case-insensitive queries', async () => {
      const caseFilter = {
        firstName: 'ALEXANDRE',
        lastName: 'ASTIER',
        search: 'TEST',
        limit: 10,
        offset: 0,
        sortBy: 'createdAt',
        sortOrder: 'DESC',
      } as FilterActorParams;

      await actorRepository.selectBy(caseFilter);

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        `LOWER(actor."firstName") = LOWER(:firstName)`,
        { firstName: 'ALEXANDRE' },
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        `LOWER(actor."lastName") = LOWER(:lastName)`,
        { lastName: 'ASTIER' },
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        `(LOWER(actor."firstName") ILIKE LOWER(:search) OR LOWER(actor."lastName") ILIKE LOWER(:search))`,
        { search: '%TEST%' },
      );
    });
  });
});
