import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CitationDto } from '../dto/citation.dto';
import { FilterCitationParams } from '../params/filter-citation.params';
import { CitationRepository } from './citation.repository';
import { Citation } from '../entities/citation.entity';

describe('CitationRepository', () => {
  let citationRepository: CitationRepository;
  let repository: Partial<Repository<Citation>>;

  const mockCitationDto: CitationDto = {
    text: "C'est pas faux !",
    actorsId: [1, 2],
    authorsId: [1],
    characterId: 1,
    episodeId: 1,
  };

  const mockCitation = {
    id: 1,
    text: mockCitationDto.text,
    character: { id: mockCitationDto.characterId, name: 'Arthur' } as any,
    episode: { id: mockCitationDto.episodeId, name: 'Test Episode' } as any,
    movie: null,
    actors: [{ id: 1 }, { id: 2 }] as any,
    authors: [{ id: 1 }] as any,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  } as unknown as Citation;

  const mockQueryBuilder = {
    andWhere: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    getOneOrFail: jest.fn(),
  } as unknown as SelectQueryBuilder<Citation>;

  const mockRelationQueryBuilder = {
    relation: jest.fn().mockReturnThis(),
    of: jest.fn().mockReturnThis(),
    add: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CitationRepository,
        {
          provide: getRepositoryToken(Citation),
          useValue: {
            save: jest.fn(),
            delete: jest.fn(),
            findOneOrFail: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
          },
        },
      ],
    }).compile();

    citationRepository = module.get<CitationRepository>(CitationRepository);
    repository = module.get<Partial<Repository<Citation>>>(getRepositoryToken(Citation));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(citationRepository).toBeDefined();
  });

  it('should call create with transformed entity', async () => {
    const expectedEntity = {
      text: mockCitationDto.text,
      character: { id: mockCitationDto.characterId },
      episode: { id: mockCitationDto.episodeId },
      movie: null,
    };

    (repository.save as jest.Mock).mockResolvedValue(mockCitation);

    const result = await citationRepository.create(mockCitationDto);

    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(repository.save).toHaveBeenCalledWith(expectedEntity);
    expect(result).toEqual(mockCitation);
  });

  it('should call create with movie instead of episode', async () => {
    const movieDto = { ...mockCitationDto, episodeId: undefined, movieId: 2 };
    const expectedEntity = {
      text: movieDto.text,
      character: { id: movieDto.characterId },
      episode: null,
      movie: { id: movieDto.movieId },
    };

    await citationRepository.create(movieDto);

    expect(repository.save).toHaveBeenCalledWith(expectedEntity);
  });

  it('should call delete', async () => {
    const deleteResult = { raw: [], affected: 1 };
    (repository.delete as jest.Mock).mockResolvedValue(deleteResult);

    const result = await citationRepository.delete({ id: 1 });

    expect(repository.delete).toHaveBeenCalledTimes(1);
    expect(repository.delete).toHaveBeenCalledWith({ id: 1 });
    expect(result).toEqual(deleteResult);
  });

  it('should call update', async () => {
    (repository.save as jest.Mock).mockResolvedValue(mockCitation);

    const result = await citationRepository.update(mockCitation);

    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(repository.save).toHaveBeenCalledWith(mockCitation);
    expect(result).toEqual(mockCitation);
  });

  it('should call selectOneBy with full relations', async () => {
    (repository.findOneOrFail as jest.Mock).mockResolvedValue(mockCitation);

    const result = await citationRepository.selectOneBy({ id: 1 });

    expect(repository.findOneOrFail).toHaveBeenCalledTimes(1);
    expect(repository.findOneOrFail).toHaveBeenCalledWith({
      where: { id: 1 },
      relations: expect.objectContaining({
        episode: { season: { show: true } },
        movie: { show: true },
        character: { actors: true },
        actors: true,
        authors: true,
      }),
    });
    expect(result).toEqual(mockCitation);
  });

  describe('selectBy', () => {
    const mockCitations = [mockCitation];
    const mockCount = 1;

    beforeEach(() => {
      jest.clearAllMocks();
      mockQueryBuilder.getManyAndCount = jest.fn().mockResolvedValue([mockCitations, mockCount]);
    });

    it('should handle complex filters with search and sorting', async () => {
      const complexFilters = {
        characterId: 1,
        episodeId: 1,
        text: 'faux',
        search: 'pas faux',
        limit: 10,
        offset: 20,
        sortBy: 'characterId',
        sortOrder: 'DESC',
      } as FilterCitationParams;

      const result = await citationRepository.selectBy(complexFilters);

      expect(repository.createQueryBuilder).toHaveBeenCalledWith('citation');
      expect(mockQueryBuilder.leftJoinAndSelect).toHaveBeenCalled();
      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith('character.id', 'DESC');
      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(20);
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(10);
      expect(result).toEqual([mockCitations, mockCount]);
    });

    it('should handle empty filters with default sorting', async () => {
      const emptyFilters = {
        limit: 100,
        offset: 0,
        sortBy: 'createdAt',
        sortOrder: 'DESC',
      } as FilterCitationParams;

      await citationRepository.selectBy(emptyFilters);

      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith('citation.createdAt', 'DESC');
      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(0);
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(100);
    });

    it('should map sortBy parameters correctly', async () => {
      const sortTests = [
        { sortBy: 'characterId', expected: 'character.id' },
        { sortBy: 'episodeId', expected: 'episode.id' },
        { sortBy: 'movieId', expected: 'movie.id' },
        { sortBy: 'citationId', expected: 'citation.id' },
        { sortBy: 'createdAt', expected: 'citation.createdAt' },
        { sortBy: 'text', expected: 'citation.text' }, // fallback
      ];

      for (const test of sortTests) {
        jest.clearAllMocks();
        const filters = {
          sortBy: test.sortBy,
          sortOrder: 'ASC',
        } as FilterCitationParams;
        await citationRepository.selectBy(filters);
        expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(test.expected, 'ASC');
      }
    });

    it('should return empty result when no citations found', async () => {
      mockQueryBuilder.getManyAndCount = jest.fn().mockResolvedValue([[], 0]);

      const result = await citationRepository.selectBy({
        limit: 10,
        offset: 0,
        sortBy: 'createdAt',
        sortOrder: 'DESC',
      } as FilterCitationParams);

      expect(result).toEqual([[], 0]);
    });
  });

  describe('Association methods', () => {
    it('should call associateCitationWithField', async () => {
      const ids = { citationId: 1, fieldId: 2 };

      // Mock the chainable relation methods
      const mockChain = {
        relation: jest.fn().mockReturnThis(),
        of: jest.fn().mockReturnThis(),
        add: jest.fn().mockResolvedValue(undefined),
      };
      (repository.createQueryBuilder as jest.Mock).mockReturnValue(mockChain);

      await citationRepository.associateCitationWithField(ids, 'actors');

      expect(repository.createQueryBuilder).toHaveBeenCalled();
      expect(mockChain.relation).toHaveBeenCalledWith(Citation, 'actors');
      expect(mockChain.of).toHaveBeenCalledWith(1);
      expect(mockChain.add).toHaveBeenCalledWith(2);
    });

    it('should call dissociateCitationWithField', async () => {
      const ids = { citationId: 1, fieldId: 3 };

      // Mock the chainable relation methods
      const mockChain = {
        relation: jest.fn().mockReturnThis(),
        of: jest.fn().mockReturnThis(),
        remove: jest.fn().mockResolvedValue(undefined),
      };
      (repository.createQueryBuilder as jest.Mock).mockReturnValue(mockChain);

      await citationRepository.dissociateCitationWithField(ids, 'authors');

      expect(repository.createQueryBuilder).toHaveBeenCalled();
      expect(mockChain.relation).toHaveBeenCalledWith(Citation, 'authors');
      expect(mockChain.of).toHaveBeenCalledWith(1);
      expect(mockChain.remove).toHaveBeenCalledWith(3);
    });
  });
});
