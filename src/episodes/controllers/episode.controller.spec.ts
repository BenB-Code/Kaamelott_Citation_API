import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '../../common/pagination/pagination.response';
import { EpisodeDto } from '../dto/episode.dto';
import { FilterEpisodeParams } from '../params/filter-episode.params';
import { EpisodeService } from '../services/episode.service';
import { EpisodeController } from './episode.controller';
import { Episode } from '../entities/episode.entity';

describe('EpisodeController', () => {
  let episodeService: EpisodeService;
  let episodeController: EpisodeController;

  const mockEpisodeDto: EpisodeDto = {
    seasonId: 1,
    name: 'Épisode 1',
    number: 1,
    picture: 'path/to/picture',
  };

  const mockEpisode = {
    id: 1,
    name: mockEpisodeDto.name,
    number: mockEpisodeDto.number,
    picture: mockEpisodeDto.picture,
    season: { id: mockEpisodeDto.seasonId },
    createdAt: new Date('2025-08-26'),
    updatedAt: new Date('2025-08-26'),
  } as Episode;

  const mockPaginationResponse: PaginationResponse<Episode> = {
    data: [mockEpisode],
    metadata: {
      limit: 100,
      offset: 0,
      total: 1,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EpisodeController,
        {
          provide: EpisodeService,
          useValue: {
            createEpisode: jest.fn(),
            getAllEpisodes: jest.fn(),
            deleteEpisode: jest.fn(),
            editEpisode: jest.fn(),
            getSpecificEpisode: jest.fn(),
          },
        },
      ],
    }).compile();

    episodeController = module.get<EpisodeController>(EpisodeController);
    episodeService = module.get<EpisodeService>(EpisodeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(episodeController).toBeDefined();
  });

  it('should call create', async () => {
    await episodeController.createEpisode(mockEpisodeDto);

    expect(episodeService.createEpisode).toHaveBeenCalledTimes(1);
    expect(episodeService.createEpisode).toHaveBeenCalledWith(mockEpisodeDto);
  });

  it('should call delete', async () => {
    await episodeController.deleteSpecificEpisode(1);

    expect(episodeService.deleteEpisode).toHaveBeenCalledTimes(1);
    expect(episodeService.deleteEpisode).toHaveBeenCalledWith(1);
  });

  it('should call editEpisode', async () => {
    await episodeController.editSpecificEpisode(1, mockEpisodeDto);

    expect(episodeService.editEpisode).toHaveBeenCalledTimes(1);
    expect(episodeService.editEpisode).toHaveBeenCalledWith(1, mockEpisodeDto);
  });

  it('should call getSpecificEpisode', async () => {
    await episodeController.getSpecificEpisode(1);

    expect(episodeService.getSpecificEpisode).toHaveBeenCalledTimes(1);
    expect(episodeService.getSpecificEpisode).toHaveBeenLastCalledWith(1);
  });

  describe('getAllEpisodes', () => {
    it('should call getAllEpisodes and return paginated response with complex filters', async () => {
      const complexFilters = {
        search: 'test',
        seasonId: 1,
        name: 'Épisode 1',
        number: 1,
        limit: 10,
        offset: 20,
        sortBy: 'name',
        sortOrder: 'ASC',
      } as FilterEpisodeParams;

      (episodeService.getAllEpisodes as jest.Mock).mockResolvedValue(mockPaginationResponse);

      const result = await episodeController.getAllEpisodes(complexFilters);

      expect(episodeService.getAllEpisodes).toHaveBeenCalledTimes(1);
      expect(episodeService.getAllEpisodes).toHaveBeenCalledWith(complexFilters);
      expect(result).toEqual(mockPaginationResponse);
    });

    it('should call getAllEpisodes with empty filters', async () => {
      const emptyFilters = {} as FilterEpisodeParams;
      const emptyResponse = {
        data: [],
        metadata: { limit: 100, offset: 0, total: 0 },
      };
      (episodeService.getAllEpisodes as jest.Mock).mockResolvedValue(emptyResponse);

      const result = await episodeController.getAllEpisodes(emptyFilters);

      expect(episodeService.getAllEpisodes).toHaveBeenCalledTimes(1);
      expect(episodeService.getAllEpisodes).toHaveBeenCalledWith(emptyFilters);
      expect(result).toEqual(emptyResponse);
    });
  });
});
