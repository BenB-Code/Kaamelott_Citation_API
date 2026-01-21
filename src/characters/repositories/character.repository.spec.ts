import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RelationQueryBuilder, Repository, SelectQueryBuilder } from 'typeorm';
import { Character } from '../entities/character.entity';
import { FilterCharacterParams } from '../params/filter-character.params';
import { CharacterRepository } from './character.repository';
import { CharacterDto } from '../dto';

describe('CharacterRepository', () => {
  let characterRepository: CharacterRepository;
  let repository: Partial<Repository<Character>>;

  const mockCharacterDto: CharacterDto = {
    name: 'Arthur',
    picture: 'path/to/picture',
  };
  const mockCharacter = {
    id: 12,
    ...mockCharacterDto,
    createdAt: new Date('08-26-2025'),
    updatedAt: new Date('08-26-2025'),
  } as Character;

  const mockRelationQueryBuilder = {
    of: jest.fn().mockReturnThis(),
    add: jest.fn().mockReturnThis(),
    remove: jest.fn(),
  } as unknown as RelationQueryBuilder<Character>;

  const mockQueryBuilder = {
    andWhere: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn(),
    leftJoin: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    getOneOrFail: jest.fn(),
    relation: jest.fn().mockReturnValue(mockRelationQueryBuilder),
  } as unknown as SelectQueryBuilder<Character>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharacterRepository,
        {
          provide: getRepositoryToken(Character),
          useValue: {
            save: jest.fn(),
            delete: jest.fn(),
            findOneByOrFail: jest.fn(),
            findBy: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
            relationQueryBuilder: jest.fn().mockReturnValue(mockRelationQueryBuilder),
          },
        },
      ],
    }).compile();

    characterRepository = module.get<CharacterRepository>(CharacterRepository);
    repository = module.get<Partial<Repository<Character>>>(getRepositoryToken(Character));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(characterRepository).toBeDefined();
  });

  it('should call create', async () => {
    await characterRepository.create(mockCharacterDto);

    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(repository.save).toHaveBeenCalledWith(mockCharacterDto);
  });

  it('should call delete', async () => {
    await characterRepository.delete({ id: mockCharacter.id });

    expect(repository.delete).toHaveBeenCalledTimes(1);
    expect(repository.delete).toHaveBeenCalledWith({ id: mockCharacter.id });
  });

  it('should call update', async () => {
    await characterRepository.update(mockCharacter);

    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(repository.save).toHaveBeenCalledWith(mockCharacter);
  });

  it('should call selectOneBy', async () => {
    mockQueryBuilder.getOneOrFail = jest.fn().mockResolvedValue(mockCharacter);

    const result = await characterRepository.selectOneBy({
      name: 'Arthur',
      id: 12,
    });

    expect(repository.createQueryBuilder).toHaveBeenCalledWith('character');
    expect(mockQueryBuilder.leftJoin).toHaveBeenCalledWith('character.citations', 'citation');
    expect(mockQueryBuilder.leftJoin).toHaveBeenCalledWith('character.actors', 'actor');
    expect(mockQueryBuilder.select).toHaveBeenCalledWith([
      'character.id',
      'character.name',
      'character.picture',
      'character.createdAt',
      'character.updatedAt',
      'citation.id',
      'actor.id',
    ]);
    expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
      `LOWER(character."name") = LOWER(:name)`,
      { name: 'Arthur' },
    );
    expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`character.id = :id`, {
      id: 12,
    });
    expect(result).toEqual(mockCharacter);
  });

  describe('selectBy', () => {
    const mockCharacters = [mockCharacter];
    const mockCount = 1;

    beforeEach(() => {
      jest.clearAllMocks();
      mockQueryBuilder.getManyAndCount = jest.fn().mockResolvedValue([mockCharacters, mockCount]);
    });

    it('should handle complex filters and query building', async () => {
      const complexFilters = {
        name: 'Arthur',
        search: 'test',
        limit: 20,
        offset: 10,
        sortBy: 'name',
        sortOrder: 'DESC',
      } as FilterCharacterParams;

      const result = await characterRepository.selectBy(complexFilters);

      expect(repository.createQueryBuilder).toHaveBeenCalledTimes(1);
      expect(repository.createQueryBuilder).toHaveBeenCalledWith('character');
      expect(mockQueryBuilder.leftJoin).toHaveBeenCalledWith('character.citations', 'citation');
      expect(mockQueryBuilder.leftJoin).toHaveBeenCalledWith('character.actors', 'actor');
      expect(mockQueryBuilder.select).toHaveBeenCalledWith([
        'character.id',
        'character.name',
        'character.picture',
        'character.createdAt',
        'character.updatedAt',
        'citation.id',
        'actor.id',
      ]);

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        `LOWER(character."name") = LOWER(:name)`,
        { name: complexFilters.name },
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        `LOWER(character."name") ILIKE LOWER(:search)`,
        { search: `%${complexFilters.search}%` },
      );

      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
        `character.${complexFilters.sortBy}`,
        complexFilters.sortOrder,
      );
      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(complexFilters.offset);
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(complexFilters.limit);
      expect(result).toEqual([mockCharacters, mockCount]);
    });

    it('should handle empty filters with pagination only', async () => {
      const emptyFilters = {
        limit: 100,
        offset: 0,
        sortBy: 'createdAt',
        sortOrder: 'DESC',
      } as FilterCharacterParams;

      await characterRepository.selectBy(emptyFilters);

      expect(mockQueryBuilder.andWhere).not.toHaveBeenCalled();
      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
        `character.${emptyFilters.sortBy}`,
        emptyFilters.sortOrder,
      );
      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(emptyFilters.offset);
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(emptyFilters.limit);
    });

    it('should return empty result when no authors found', async () => {
      const basicFilters = {
        limit: 10,
        offset: 0,
        sortBy: 'id',
        sortOrder: 'ASC',
      } as FilterCharacterParams;
      mockQueryBuilder.getManyAndCount = jest.fn().mockResolvedValue([[], 0]);

      const result = await characterRepository.selectBy(basicFilters);

      expect(result).toEqual([[], 0]);
    });

    it('should properly construct case-insensitive queries', async () => {
      const caseFilter = {
        name: 'ARTHUR',
        search: 'TEST',
        limit: 10,
        offset: 0,
        sortBy: 'createdAt',
        sortOrder: 'DESC',
      } as FilterCharacterParams;

      await characterRepository.selectBy(caseFilter);

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        `LOWER(character."name") = LOWER(:name)`,
        { name: 'ARTHUR' },
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        `LOWER(character."name") ILIKE LOWER(:search)`,
        { search: '%TEST%' },
      );
    });
  });

  it('should call associateCharacterActor', async () => {
    await characterRepository.associateCharacterActor({
      characterId: 1,
      actorId: 2,
    });

    expect(mockQueryBuilder.relation).toHaveBeenCalledWith(Character, 'actors');
    expect(mockRelationQueryBuilder.of).toHaveBeenCalledWith(1);
    expect(mockRelationQueryBuilder.add).toHaveBeenCalledWith(2);
  });

  it('should call dissociateCharacterActor', async () => {
    await characterRepository.dissociateCharacterActor({
      characterId: 1,
      actorId: 2,
    });

    expect(mockQueryBuilder.relation).toHaveBeenCalledWith(Character, 'actors');
    expect(mockRelationQueryBuilder.of).toHaveBeenCalledWith(1);
    expect(mockRelationQueryBuilder.remove).toHaveBeenCalledWith(2);
  });
});
