import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '../../common/pagination/pagination.response';
import { CitationDto } from '../dto/citation.dto';
import { FilterCitationParams } from '../params/filter-citation.params';
import { CitationService } from '../services/citation.service';
import { CitationController } from './citation.controller';
import { Citation } from '../entities/citation.entity';

describe('CitationController', () => {
  let citationService: CitationService;
  let citationController: CitationController;

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

  const mockPaginationResponse: PaginationResponse<Citation> = {
    data: [mockCitation],
    metadata: {
      limit: 100,
      offset: 0,
      total: 1,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CitationController,
        {
          provide: CitationService,
          useValue: {
            createCitation: jest.fn(),
            getAllCitations: jest.fn(),
            deleteSpecificCitation: jest.fn(),
            editCitation: jest.fn(),
            getSpecificCitation: jest.fn(),
            associateCitationWithField: jest.fn(),
            dissociateCitationWithField: jest.fn(),
          },
        },
      ],
    }).compile();

    citationController = module.get<CitationController>(CitationController);
    citationService = module.get<CitationService>(CitationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(citationController).toBeDefined();
  });

  it('should call createCitation', async () => {
    (citationService.createCitation as jest.Mock).mockResolvedValue(
      mockCitation,
    );

    const result = await citationController.createCitation(mockCitationDto);

    expect(citationService.createCitation).toHaveBeenCalledTimes(1);
    expect(citationService.createCitation).toHaveBeenCalledWith(
      mockCitationDto,
    );
    expect(result).toEqual(mockCitation);
  });

  it('should call deleteSpecificCitation', async () => {
    const mockDeleteResult = { raw: [], affected: 1 };
    (citationService.deleteSpecificCitation as jest.Mock).mockResolvedValue(
      mockDeleteResult,
    );

    const result = await citationController.deleteSpecificCitation(1);

    expect(citationService.deleteSpecificCitation).toHaveBeenCalledTimes(1);
    expect(citationService.deleteSpecificCitation).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockDeleteResult);
  });

  it('should call editSpecificCitation', async () => {
    const updateDto = { text: 'Updated text' };
    (citationService.editCitation as jest.Mock).mockResolvedValue({
      ...mockCitation,
      text: 'Updated text',
    });

    await citationController.editSpecificCitation(1, updateDto);

    expect(citationService.editCitation).toHaveBeenCalledTimes(1);
    expect(citationService.editCitation).toHaveBeenCalledWith(1, updateDto);
  });

  it('should call getSpecificCitation', async () => {
    (citationService.getSpecificCitation as jest.Mock).mockResolvedValue(
      mockCitation,
    );

    const result = await citationController.getSpecificCitation(1);

    expect(citationService.getSpecificCitation).toHaveBeenCalledTimes(1);
    expect(citationService.getSpecificCitation).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockCitation);
  });

  describe('getAllCitation', () => {
    it('should call getAllCitations with complex filters', async () => {
      const complexFilters = {
        search: 'faux',
        characterId: 1,
        episodeId: 1,
        text: "C'est pas faux !",
        limit: 10,
        offset: 20,
        sortBy: 'characterId',
        sortOrder: 'ASC',
      } as FilterCitationParams;

      (citationService.getAllCitations as jest.Mock).mockResolvedValue(
        mockPaginationResponse,
      );

      const result = await citationController.getAllCitation(complexFilters);

      expect(citationService.getAllCitations).toHaveBeenCalledTimes(1);
      expect(citationService.getAllCitations).toHaveBeenCalledWith(
        complexFilters,
      );
      expect(result).toEqual(mockPaginationResponse);
    });

    it('should call getAllCitations with empty filters', async () => {
      const emptyFilters = {} as FilterCitationParams;
      const emptyResponse = {
        data: [],
        metadata: { limit: 100, offset: 0, total: 0 },
      };
      (citationService.getAllCitations as jest.Mock).mockResolvedValue(
        emptyResponse,
      );

      const result = await citationController.getAllCitation(emptyFilters);

      expect(citationService.getAllCitations).toHaveBeenCalledTimes(1);
      expect(citationService.getAllCitations).toHaveBeenCalledWith(
        emptyFilters,
      );
      expect(result).toEqual(emptyResponse);
    });
  });

  describe('Association routes', () => {
    it('should call associateCitationActor', async () => {
      const ids = { citationId: 1, fieldId: 2 };

      await citationController.associateCitationActor(ids);

      expect(citationService.associateCitationWithField).toHaveBeenCalledTimes(
        1,
      );
      expect(citationService.associateCitationWithField).toHaveBeenCalledWith(
        ids,
        'actors',
      );
    });

    it('should call dissociateCitationActor', async () => {
      const ids = { citationId: 1, fieldId: 2 };

      await citationController.dissociateCitationActor(ids);

      expect(citationService.dissociateCitationWithField).toHaveBeenCalledTimes(
        1,
      );
      expect(citationService.dissociateCitationWithField).toHaveBeenCalledWith(
        ids,
        'actors',
      );
    });

    it('should call associateCitationAuthor', async () => {
      const ids = { citationId: 1, fieldId: 3 };

      await citationController.associateCitationAuthor(ids);

      expect(citationService.associateCitationWithField).toHaveBeenCalledTimes(
        1,
      );
      expect(citationService.associateCitationWithField).toHaveBeenCalledWith(
        ids,
        'authors',
      );
    });

    it('should call dissociateCitationAuthor', async () => {
      const ids = { citationId: 1, fieldId: 3 };

      await citationController.dissociateCitationAuthor(ids);

      expect(citationService.dissociateCitationWithField).toHaveBeenCalledTimes(
        1,
      );
      expect(citationService.dissociateCitationWithField).toHaveBeenCalledWith(
        ids,
        'authors',
      );
    });
  });
});
