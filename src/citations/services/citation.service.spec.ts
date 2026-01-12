import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { CitationDto } from '../dto/citation.dto';
import { FilterCitationParams } from '../params/filter-citation.params';
import { DatabaseExceptions } from '../../common/exceptions/database-exceptions.service';
import { CitationRepository } from '../repositories/citation.repository';
import { CitationService } from './citation.service';
import { Citation } from '../entities/citation.entity';

describe('CitationService', () => {
  let citationService: CitationService;
  let citationRepository: CitationRepository;

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CitationService,
        {
          provide: CitationRepository,
          useValue: {
            create: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
            selectOneBy: jest.fn(),
            selectBy: jest.fn(),
            associateCitationWithField: jest.fn(),
            dissociateCitationWithField: jest.fn(),
          },
        },
        DatabaseExceptions,
      ],
    }).compile();

    citationService = module.get<CitationService>(CitationService);
    citationRepository = module.get<CitationRepository>(CitationRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(citationService).toBeDefined();
  });

  describe('createCitation', () => {
    it('should create citation with actors and authors', async () => {
      (citationRepository.create as jest.Mock).mockResolvedValueOnce(mockCitation);
      (citationRepository.selectOneBy as jest.Mock).mockResolvedValueOnce(mockCitation);

      const result = await citationService.createCitation(mockCitationDto);

      expect(citationRepository.create).toHaveBeenCalledTimes(1);
      expect(citationRepository.associateCitationWithField).toHaveBeenCalledTimes(3);
      expect(result).toEqual(mockCitation);
    });

    it('should throw: [UNIQUE_VIOLATION]', async () => {
      const mockError = new QueryFailedError('', [], {
        code: '23505',
      } as any);
      (citationRepository.create as jest.Mock).mockRejectedValue(mockError);

      try {
        await citationService.createCitation(mockCitationDto);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.response.message).toBe(
          '[UNIQUE_VIOLATION] Cannot perform operation: Resource already exists',
        );
      }
    });
  });

  describe('deleteSpecificCitation', () => {
    it('should delete citation with associations', async () => {
      (citationRepository.selectOneBy as jest.Mock).mockResolvedValue(mockCitation);
      (citationRepository.delete as jest.Mock).mockResolvedValue({
        raw: [],
        affected: 1,
      });

      const result = await citationService.deleteSpecificCitation(1);

      expect(citationRepository.dissociateCitationWithField).toHaveBeenCalledTimes(3);
      expect(citationRepository.delete).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual({ raw: [], affected: 1 });
    });

    it('should throw: [NO_DATA_FOUND]', async () => {
      (citationRepository.selectOneBy as jest.Mock).mockRejectedValue(
        new EntityNotFoundError(Citation, { id: 999 }),
      );

      try {
        await citationService.deleteSpecificCitation(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.response.message).toBe(
          '[NO_DATA_FOUND] Cannot perform operation: Data not found.',
        );
      }
    });
  });

  describe('editCitation', () => {
    it('should update citation', async () => {
      (citationRepository.selectOneBy as jest.Mock).mockResolvedValue(mockCitation);
      (citationRepository.update as jest.Mock).mockResolvedValue({
        ...mockCitation,
        text: 'Updated text',
      });

      await citationService.editCitation(1, { text: 'Updated text' });

      expect(citationRepository.update).toHaveBeenCalledTimes(1);
      expect(citationRepository.update).toHaveBeenCalledWith({
        ...mockCitation,
        text: 'Updated text',
      });
    });

    it('should handle database errors', async () => {
      const mockError = new Error('Database connection failed');
      (citationRepository.selectOneBy as jest.Mock).mockRejectedValue(mockError);

      try {
        await citationService.editCitation(1, { text: 'Updated text' });
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('getSpecificCitation', () => {
    it('should return citation', async () => {
      (citationRepository.selectOneBy as jest.Mock).mockResolvedValue(mockCitation);

      const result = await citationService.getSpecificCitation(1);

      expect(citationRepository.selectOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(mockCitation);
    });

    it('should throw: [NO_DATA_FOUND]', async () => {
      (citationRepository.selectOneBy as jest.Mock).mockRejectedValue(
        new EntityNotFoundError(Citation, { id: 999 }),
      );

      try {
        await citationService.getSpecificCitation(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('getAllCitations', () => {
    const mockCitations = [mockCitation];
    const mockCount = 1;

    it('should return paginated citations with complex filters', async () => {
      const complexFilters = {
        search: 'faux',
        characterId: 1,
        episodeId: 1,
        sortBy: 'createdAt',
        sortOrder: 'DESC',
        limit: 20,
        offset: 10,
      } as FilterCitationParams;

      (citationRepository.selectBy as jest.Mock).mockResolvedValue([mockCitations, mockCount]);

      const result = await citationService.getAllCitations(complexFilters);

      expect(citationRepository.selectBy).toHaveBeenCalledWith(complexFilters);
      expect(result).toEqual({
        data: mockCitations,
        metadata: {
          limit: complexFilters.limit,
          offset: complexFilters.offset,
          total: mockCount,
        },
      });
    });

    it('should handle database errors', async () => {
      const mockError = new Error('Database connection failed');
      (citationRepository.selectBy as jest.Mock).mockRejectedValue(mockError);

      try {
        await citationService.getAllCitations({
          limit: 10,
          offset: 0,
        } as FilterCitationParams);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('associateCitationWithField', () => {
    it('should associate citation with field', async () => {
      await citationService.associateCitationWithField({ citationId: 1, fieldId: 2 }, 'actors');

      expect(citationRepository.associateCitationWithField).toHaveBeenCalledWith(
        { citationId: 1, fieldId: 2 },
        'actors',
      );
    });
  });

  describe('dissociateCitationWithField', () => {
    it('should dissociate citation from field', async () => {
      await citationService.dissociateCitationWithField({ citationId: 1, fieldId: 2 }, 'authors');

      expect(citationRepository.dissociateCitationWithField).toHaveBeenCalledWith(
        { citationId: 1, fieldId: 2 },
        'authors',
      );
    });
  });
});
