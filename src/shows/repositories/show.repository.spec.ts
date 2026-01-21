import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { MediaType } from '../constant/media-type.enum';
import { Show } from '../entities/show.entity';
import { FilterShowParams } from '../params/filter-show.params';
import { ShowRepository } from './show.repository';
import { ShowDto } from '../dto';

describe('ShowRepository', () => {
  let showRepository: ShowRepository;
  let repository: Partial<Repository<Show>>;

  const mockShowDto: ShowDto = {
    name: 'kaamelott',
    mediaType: MediaType.FILM,
  };
  const mockShow = {
    id: 12,
    ...mockShowDto,
    createdAt: new Date('08-26-2025'),
    updatedAt: new Date('08-26-2025'),
  } as Show;

  const mockQueryBuilder = {
    andWhere: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn(),
    select: jest.fn().mockReturnThis(),
    getOneOrFail: jest.fn(),
  } as unknown as SelectQueryBuilder<Show>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShowRepository,
        {
          provide: getRepositoryToken(Show),
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

    showRepository = module.get<ShowRepository>(ShowRepository);
    repository = module.get<Partial<Repository<Show>>>(getRepositoryToken(Show));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(showRepository).toBeDefined();
  });

  it('should call create', async () => {
    await showRepository.create(mockShowDto);

    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(repository.save).toHaveBeenCalledWith(mockShowDto);
  });

  it('should call delete', async () => {
    await showRepository.delete({ id: mockShow.id });

    expect(repository.delete).toHaveBeenCalledTimes(1);
    expect(repository.delete).toHaveBeenCalledWith({ id: mockShow.id });
  });

  it('should call update', async () => {
    await showRepository.update(mockShow);

    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(repository.save).toHaveBeenCalledWith(mockShow);
  });

  it('should call selectOneBy', async () => {
    mockQueryBuilder.getOneOrFail = jest.fn().mockResolvedValue(mockShow);

    const result = await showRepository.selectOneBy({
      name: 'kaamelott',
      mediaType: MediaType.FILM,
      id: 12,
    });

    expect(repository.createQueryBuilder).toHaveBeenCalledWith('show');
    expect(mockQueryBuilder.select).toHaveBeenCalledWith([
      'show.id',
      'show.name',
      'show.mediaType',
      'show.createdAt',
      'show.updatedAt',
    ]);
    expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`LOWER(show."name") = LOWER(:name)`, {
      name: 'kaamelott',
    });
    expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`show."mediaType" = :mediaType`, {
      mediaType: 'film',
    });
    expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`show.id = :id`, {
      id: 12,
    });
    expect(result).toEqual(mockShow);
  });

  describe('selectBy', () => {
    const mockShows = [mockShow];
    const mockCount = 1;

    beforeEach(() => {
      jest.clearAllMocks();
      mockQueryBuilder.getManyAndCount = jest.fn().mockResolvedValue([mockShows, mockCount]);
    });

    it('should handle complex filters and query building', async () => {
      const complexFilters = {
        name: 'kaamelott',
        mediaType: 'film',
        search: 'test',
        limit: 20,
        offset: 10,
        sortBy: 'name',
        sortOrder: 'DESC',
      } as FilterShowParams;

      const result = await showRepository.selectBy(complexFilters);

      expect(repository.createQueryBuilder).toHaveBeenCalledTimes(1);
      expect(repository.createQueryBuilder).toHaveBeenCalledWith('show');
      expect(mockQueryBuilder.select).toHaveBeenCalledWith([
        'show.id',
        'show.name',
        'show.mediaType',
        'show.createdAt',
        'show.updatedAt',
      ]);

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`LOWER(show."name") = LOWER(:name)`, {
        name: complexFilters.name,
      });
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`show."mediaType" = :mediaType`, {
        mediaType: complexFilters.mediaType,
      });
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        `(LOWER(show."name") ILIKE LOWER(:search))`,
        { search: `%${complexFilters.search}%` },
      );

      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
        `show.${complexFilters.sortBy}`,
        complexFilters.sortOrder,
      );
      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(complexFilters.offset);
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(complexFilters.limit);
      expect(result).toEqual([mockShows, mockCount]);
    });

    it('should handle empty filters with pagination only', async () => {
      const emptyFilters = {
        limit: 100,
        offset: 0,
        sortBy: 'createdAt',
        sortOrder: 'DESC',
      } as FilterShowParams;

      await showRepository.selectBy(emptyFilters);

      expect(mockQueryBuilder.andWhere).not.toHaveBeenCalled();
      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
        `show.${emptyFilters.sortBy}`,
        emptyFilters.sortOrder,
      );
      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(emptyFilters.offset);
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(emptyFilters.limit);
    });

    it('should return empty result when no shows found', async () => {
      const basicFilters = {
        limit: 10,
        offset: 0,
        sortBy: 'id',
        sortOrder: 'ASC',
      } as FilterShowParams;
      mockQueryBuilder.getManyAndCount = jest.fn().mockResolvedValue([[], 0]);

      const result = await showRepository.selectBy(basicFilters);

      expect(result).toEqual([[], 0]);
    });

    it('should handle undefined sortBy with default id', async () => {
      const filtersWithoutSortBy = {
        limit: 10,
        offset: 0,
        sortBy: undefined,
        sortOrder: 'ASC',
      } as FilterShowParams;

      await showRepository.selectBy(filtersWithoutSortBy);

      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith('show.id', 'ASC');
    });

    it('should properly construct case-insensitive queries', async () => {
      const caseFilter = {
        name: 'KAAMEELOTT',
        mediaType: MediaType.FILM,
        search: 'TEST',
        limit: 10,
        offset: 0,
        sortBy: 'createdAt',
        sortOrder: 'DESC',
      } as FilterShowParams;

      await showRepository.selectBy(caseFilter);

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`LOWER(show."name") = LOWER(:name)`, {
        name: 'KAAMEELOTT',
      });
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`show."mediaType" = :mediaType`, {
        mediaType: 'film',
      });
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        `(LOWER(show."name") ILIKE LOWER(:search))`,
        { search: '%TEST%' },
      );
    });
  });
});
