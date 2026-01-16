import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { FilterEpisodeParams } from '../params/filter-episode.params';
import { EpisodeRepository } from './episode.repository';
import { Episode } from '../entities/episode.entity';
import { EpisodeDto } from '../dto';

describe('EpisodeRepository', () => {
  let episodeRepository: EpisodeRepository;
  let repository: Partial<Repository<Episode>>;

  const mockEpisodeDto: EpisodeDto = {
    seasonId: 1,
    name: 'Épisode 1',
    number: 1,
    picture: 'path/to/picture',
  };
  const mockEpisode = {
    id: 12,
    name: mockEpisodeDto.name,
    number: mockEpisodeDto.number,
    picture: mockEpisodeDto.picture,
    season: { id: mockEpisodeDto.seasonId },
    createdAt: new Date('08-26-2025'),
    updatedAt: new Date('08-26-2025'),
  } as Episode;

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
  } as unknown as SelectQueryBuilder<Episode>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EpisodeRepository,
        {
          provide: getRepositoryToken(Episode),
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

    episodeRepository = module.get<EpisodeRepository>(EpisodeRepository);
    repository = module.get<Partial<Repository<Episode>>>(getRepositoryToken(Episode));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(episodeRepository).toBeDefined();
  });

  it('should call create', async () => {
    const expectedEpisode = {
      name: mockEpisodeDto.name,
      number: mockEpisodeDto.number,
      picture: mockEpisodeDto.picture,
      season: { id: mockEpisodeDto.seasonId },
    };
    (repository.create as jest.Mock).mockReturnValue(expectedEpisode);

    await episodeRepository.create(mockEpisodeDto);

    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(repository.create).toHaveBeenCalledWith(expectedEpisode);
    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(repository.save).toHaveBeenCalledWith(expectedEpisode);
  });

  it('should call delete', async () => {
    await episodeRepository.delete({ id: mockEpisode.id });

    expect(repository.delete).toHaveBeenCalledTimes(1);
    expect(repository.delete).toHaveBeenCalledWith({ id: mockEpisode.id });
  });

  it('should call update', async () => {
    await episodeRepository.update(mockEpisode);

    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(repository.save).toHaveBeenCalledWith(mockEpisode);
  });

  it('should call selectOneBy', async () => {
    mockQueryBuilder.getOneOrFail = jest.fn().mockResolvedValue(mockEpisode);

    const result = await episodeRepository.selectOneBy({
      name: 'Épisode 1',
      seasonId: 1,
      number: 1,
      id: 12,
    });

    expect(repository.createQueryBuilder).toHaveBeenCalledWith('episode');
    expect(mockQueryBuilder.leftJoinAndSelect).toHaveBeenCalledWith('episode.season', 'season');
    expect(mockQueryBuilder.leftJoinAndSelect).toHaveBeenCalledWith('season.show', 'show');
    expect(mockQueryBuilder.leftJoin).toHaveBeenCalledWith('episode.citations', 'citation');
    expect(mockQueryBuilder.select).toHaveBeenCalledWith([
      'episode.id',
      'episode.name',
      'episode.number',
      'episode.picture',
      'episode.createdAt',
      'episode.updatedAt',
      'season.id',
      'season.name',
      'show.id',
      'show.name',
      'citation.id',
    ]);
    expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`LOWER(episode.name) = LOWER(:name)`, {
      name: 'Épisode 1',
    });
    expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`season.id = :seasonId`, {
      seasonId: 1,
    });
    expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`episode.number = :number`, {
      number: 1,
    });
    expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`episode.id = :id`, {
      id: 12,
    });
    expect(result).toEqual(mockEpisode);
  });

  describe('selectBy', () => {
    const mockEpisodes = [mockEpisode];
    const mockCount = 1;

    beforeEach(() => {
      jest.clearAllMocks();
      mockQueryBuilder.getManyAndCount = jest.fn().mockResolvedValue([mockEpisodes, mockCount]);
    });

    it('should handle complex filters and query building', async () => {
      const complexFilters = {
        seasonId: 1,
        name: 'Épisode 1',
        number: 1,
        search: 'test',
        limit: 20,
        offset: 10,
        sortBy: 'name',
        sortOrder: 'DESC',
      } as FilterEpisodeParams;

      const result = await episodeRepository.selectBy(complexFilters);

      expect(repository.createQueryBuilder).toHaveBeenCalledTimes(1);
      expect(repository.createQueryBuilder).toHaveBeenCalledWith('episode');
      expect(mockQueryBuilder.leftJoinAndSelect).toHaveBeenCalledWith('episode.season', 'season');
      expect(mockQueryBuilder.leftJoinAndSelect).toHaveBeenCalledWith('season.show', 'show');
      expect(mockQueryBuilder.leftJoin).toHaveBeenCalledWith('episode.citations', 'citation');
      expect(mockQueryBuilder.select).toHaveBeenCalledWith([
        'episode.id',
        'episode.name',
        'episode.number',
        'episode.picture',
        'episode.createdAt',
        'episode.updatedAt',
        'season.id',
        'season.name',
        'show.id',
        'show.name',
        'citation.id',
      ]);

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`season.id = :seasonId`, {
        seasonId: complexFilters.seasonId,
      });
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`LOWER(episode.name) = LOWER(:name)`, {
        name: complexFilters.name,
      });
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`episode.number = :number`, {
        number: complexFilters.number,
      });
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        `LOWER(episode.name) ILIKE LOWER(:search)`,
        { search: `%${complexFilters.search}%` },
      );

      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
        `episode.${complexFilters.sortBy}`,
        complexFilters.sortOrder,
      );
      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(complexFilters.offset);
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(complexFilters.limit);
      expect(result).toEqual([mockEpisodes, mockCount]);
    });

    it('should handle empty filters with pagination only', async () => {
      const emptyFilters = {
        limit: 100,
        offset: 0,
        sortBy: 'createdAt',
        sortOrder: 'DESC',
      } as FilterEpisodeParams;

      await episodeRepository.selectBy(emptyFilters);

      expect(mockQueryBuilder.andWhere).not.toHaveBeenCalled();
      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
        `episode.${emptyFilters.sortBy}`,
        emptyFilters.sortOrder,
      );
      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(emptyFilters.offset);
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(emptyFilters.limit);
    });

    it('should return empty result when no episodes found', async () => {
      const basicFilters = {
        limit: 10,
        offset: 0,
        sortBy: 'id',
        sortOrder: 'ASC',
      } as FilterEpisodeParams;
      mockQueryBuilder.getManyAndCount = jest.fn().mockResolvedValue([[], 0]);

      const result = await episodeRepository.selectBy(basicFilters);

      expect(result).toEqual([[], 0]);
    });

    it('should handle undefined sortBy with default empty string', async () => {
      const filtersWithoutSortBy = {
        limit: 10,
        offset: 0,
        sortBy: undefined,
        sortOrder: 'ASC',
      } as FilterEpisodeParams;

      await episodeRepository.selectBy(filtersWithoutSortBy);

      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith('episode.', 'ASC');
    });

    it('should properly construct case-insensitive queries', async () => {
      const caseFilter = {
        seasonId: 1,
        name: 'ÉPISODE 1',
        number: 1,
        search: 'TEST',
        limit: 10,
        offset: 0,
        sortBy: 'createdAt',
        sortOrder: 'DESC',
      } as FilterEpisodeParams;

      await episodeRepository.selectBy(caseFilter);

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`season.id = :seasonId`, {
        seasonId: 1,
      });
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`LOWER(episode.name) = LOWER(:name)`, {
        name: 'ÉPISODE 1',
      });
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`episode.number = :number`, {
        number: 1,
      });
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        `LOWER(episode.name) ILIKE LOWER(:search)`,
        { search: '%TEST%' },
      );
    });
  });
});
