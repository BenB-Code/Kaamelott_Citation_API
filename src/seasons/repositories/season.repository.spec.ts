import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { FilterSeasonParams } from '../params/filter-season.params';
import { SeasonRepository } from './season.repository';
import { Season } from '../entities/season.entity';
import { SeasonDto } from '../dto';

describe('SeasonRepository', () => {
  let seasonRepository: SeasonRepository;
  let repository: Partial<Repository<Season>>;

  const mockSeasonDto: SeasonDto = {
    showId: 1,
    name: 'Saison 1',
    picture: 'path/to/picture',
  };
  const mockSeason = {
    id: 12,
    name: mockSeasonDto.name,
    picture: mockSeasonDto.picture,
    show: { id: mockSeasonDto.showId },
    createdAt: new Date('08-26-2025'),
    updatedAt: new Date('08-26-2025'),
  } as Season;

  const mockQueryBuilder = {
    andWhere: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn(),
    leftJoin: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    getOneOrFail: jest.fn(),
  } as unknown as SelectQueryBuilder<Season>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeasonRepository,
        {
          provide: getRepositoryToken(Season),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            findOneByOrFail: jest.fn(),
            findBy: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
          },
        },
      ],
    }).compile();

    seasonRepository = module.get<SeasonRepository>(SeasonRepository);
    repository = module.get<Partial<Repository<Season>>>(getRepositoryToken(Season));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(seasonRepository).toBeDefined();
  });

  it('should call create', async () => {
    const expectedSeason = {
      name: mockSeasonDto.name,
      picture: mockSeasonDto.picture,
      show: { id: mockSeasonDto.showId },
    };
    (repository.create as jest.Mock).mockReturnValue(expectedSeason);

    await seasonRepository.create(mockSeasonDto);

    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(repository.create).toHaveBeenCalledWith(expectedSeason);
    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(repository.save).toHaveBeenCalledWith(expectedSeason);
  });

  it('should call delete', async () => {
    await seasonRepository.delete({ id: mockSeason.id });

    expect(repository.delete).toHaveBeenCalledTimes(1);
    expect(repository.delete).toHaveBeenCalledWith({ id: mockSeason.id });
  });

  it('should call update', async () => {
    await seasonRepository.update(mockSeason);

    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(repository.save).toHaveBeenCalledWith(mockSeason);
  });

  it('should call selectOneBy', async () => {
    mockQueryBuilder.getOneOrFail = jest.fn().mockResolvedValue(mockSeason);

    const result = await seasonRepository.selectOneBy({
      name: 'Saison 1',
      showId: 1,
      id: 12,
    });

    expect(repository.createQueryBuilder).toHaveBeenCalledWith('season');
    expect(mockQueryBuilder.leftJoinAndSelect).toHaveBeenCalledWith('season.show', 'show');
    expect(mockQueryBuilder.leftJoin).toHaveBeenCalledWith('season.episodes', 'episode');
    expect(mockQueryBuilder.select).toHaveBeenCalledWith([
      'season.id',
      'season.name',
      'season.picture',
      'season.createdAt',
      'season.updatedAt',
      'show.id',
      'show.name',
      'episode.id',
    ]);
    expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`LOWER(season.name) = LOWER(:name)`, {
      name: 'Saison 1',
    });
    expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`show.id = :showId`, { showId: 1 });
    expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`season.id = :id`, {
      id: 12,
    });
    expect(result).toEqual(mockSeason);
  });

  describe('selectBy', () => {
    const mockSeasons = [mockSeason];
    const mockCount = 1;

    beforeEach(() => {
      jest.clearAllMocks();
      mockQueryBuilder.getManyAndCount = jest.fn().mockResolvedValue([mockSeasons, mockCount]);
    });

    it('should handle complex filters and query building', async () => {
      const complexFilters = {
        showId: 1,
        name: 'Saison 1',
        search: 'test',
        limit: 20,
        offset: 10,
        sortBy: 'name',
        sortOrder: 'DESC',
      } as FilterSeasonParams;

      const result = await seasonRepository.selectBy(complexFilters);

      expect(repository.createQueryBuilder).toHaveBeenCalledTimes(1);
      expect(repository.createQueryBuilder).toHaveBeenCalledWith('season');
      expect(mockQueryBuilder.leftJoinAndSelect).toHaveBeenCalledWith('season.show', 'show');
      expect(mockQueryBuilder.leftJoin).toHaveBeenCalledWith('season.episodes', 'episode');
      expect(mockQueryBuilder.select).toHaveBeenCalledWith([
        'season.id',
        'season.name',
        'season.picture',
        'season.createdAt',
        'season.updatedAt',
        'show.id',
        'show.name',
        'episode.id',
      ]);

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`show.id = :showId`, {
        showId: complexFilters.showId,
      });
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`LOWER(season.name) = LOWER(:name)`, {
        name: complexFilters.name,
      });
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        `LOWER(season.name) ILIKE LOWER(:search)`,
        { search: `%${complexFilters.search}%` },
      );

      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
        `season.${complexFilters.sortBy}`,
        complexFilters.sortOrder,
      );
      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(complexFilters.offset);
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(complexFilters.limit);
      expect(result).toEqual([mockSeasons, mockCount]);
    });

    it('should handle empty filters with pagination only', async () => {
      const emptyFilters = {
        limit: 100,
        offset: 0,
        sortBy: 'createdAt',
        sortOrder: 'DESC',
      } as FilterSeasonParams;

      await seasonRepository.selectBy(emptyFilters);

      expect(mockQueryBuilder.andWhere).not.toHaveBeenCalled();
      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
        `season.${emptyFilters.sortBy}`,
        emptyFilters.sortOrder,
      );
      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(emptyFilters.offset);
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(emptyFilters.limit);
    });

    it('should return empty result when no seasons found', async () => {
      const basicFilters = {
        limit: 10,
        offset: 0,
        sortBy: 'id',
        sortOrder: 'ASC',
      } as FilterSeasonParams;
      mockQueryBuilder.getManyAndCount = jest.fn().mockResolvedValue([[], 0]);

      const result = await seasonRepository.selectBy(basicFilters);

      expect(result).toEqual([[], 0]);
    });

    it('should handle undefined sortBy with default empty string', async () => {
      const filtersWithoutSortBy = {
        limit: 10,
        offset: 0,
        sortBy: undefined,
        sortOrder: 'ASC',
      } as FilterSeasonParams;

      await seasonRepository.selectBy(filtersWithoutSortBy);

      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith('season.', 'ASC');
    });

    it('should properly construct case-insensitive queries', async () => {
      const caseFilter = {
        showId: 1,
        name: 'SAISON 1',
        search: 'TEST',
        limit: 10,
        offset: 0,
        sortBy: 'createdAt',
        sortOrder: 'DESC',
      } as FilterSeasonParams;

      await seasonRepository.selectBy(caseFilter);

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`show.id = :showId`, { showId: 1 });
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`LOWER(season.name) = LOWER(:name)`, {
        name: 'SAISON 1',
      });
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        `LOWER(season.name) ILIKE LOWER(:search)`,
        { search: '%TEST%' },
      );
    });
  });
});
