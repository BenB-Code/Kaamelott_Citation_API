import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '../../common/pagination/pagination.response';
import { SeasonDto } from '../dto/season.dto';
import { FilterSeasonParams } from '../params/filter-season.params';
import { SeasonService } from '../services/season.service';
import { SeasonController } from './season.controller';
import { Season } from '../entities/season.entity';

describe('SeasonController', () => {
  let seasonService: SeasonService;
  let seasonController: SeasonController;

  const mockSeasonDto: SeasonDto = {
    showId: 1,
    name: 'Saison 1',
    picture: 'path/to/picture',
  };

  const mockSeason = {
    id: 1,
    name: mockSeasonDto.name,
    picture: mockSeasonDto.picture,
    show: { id: mockSeasonDto.showId },
    createdAt: new Date('2025-08-26'),
    updatedAt: new Date('2025-08-26'),
  } as Season;

  const mockPaginationResponse: PaginationResponse<Season> = {
    data: [mockSeason],
    metadata: {
      limit: 100,
      offset: 0,
      total: 1,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeasonController,
        {
          provide: SeasonService,
          useValue: {
            createSeason: jest.fn(),
            getAllSeasons: jest.fn(),
            deleteSeason: jest.fn(),
            editSeason: jest.fn(),
            getSpecificSeason: jest.fn(),
          },
        },
      ],
    }).compile();

    seasonController = module.get<SeasonController>(SeasonController);
    seasonService = module.get<SeasonService>(SeasonService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(seasonController).toBeDefined();
  });

  it('should call create', async () => {
    await seasonController.createSeason(mockSeasonDto);

    expect(seasonService.createSeason).toHaveBeenCalledTimes(1);
    expect(seasonService.createSeason).toHaveBeenCalledWith(mockSeasonDto);
  });

  it('should call delete', async () => {
    await seasonController.deleteSpecificSeason(1);

    expect(seasonService.deleteSeason).toHaveBeenCalledTimes(1);
    expect(seasonService.deleteSeason).toHaveBeenCalledWith(1);
  });

  it('should call editSeason', async () => {
    await seasonController.editSpecificSeason(1, mockSeasonDto);

    expect(seasonService.editSeason).toHaveBeenCalledTimes(1);
    expect(seasonService.editSeason).toHaveBeenCalledWith(1, mockSeasonDto);
  });

  it('should call getSpecificSeason', async () => {
    await seasonController.getSpecificSeason(1);

    expect(seasonService.getSpecificSeason).toHaveBeenCalledTimes(1);
    expect(seasonService.getSpecificSeason).toHaveBeenLastCalledWith(1);
  });

  describe('getAllSeasons', () => {
    it('should call getAllSeasons and return paginated response with complex filters', async () => {
      const complexFilters = {
        search: 'test',
        showId: 1,
        name: 'Saison 1',
        limit: 10,
        offset: 20,
        sortBy: 'name',
        sortOrder: 'ASC',
      } as FilterSeasonParams;

      (seasonService.getAllSeasons as jest.Mock).mockResolvedValue(mockPaginationResponse);

      const result = await seasonController.getAllSeasons(complexFilters);

      expect(seasonService.getAllSeasons).toHaveBeenCalledTimes(1);
      expect(seasonService.getAllSeasons).toHaveBeenCalledWith(complexFilters);
      expect(result).toEqual(mockPaginationResponse);
    });

    it('should call getAllSeasons with empty filters', async () => {
      const emptyFilters = {} as FilterSeasonParams;
      const emptyResponse = {
        data: [],
        metadata: { limit: 100, offset: 0, total: 0 },
      };
      (seasonService.getAllSeasons as jest.Mock).mockResolvedValue(emptyResponse);

      const result = await seasonController.getAllSeasons(emptyFilters);

      expect(seasonService.getAllSeasons).toHaveBeenCalledTimes(1);
      expect(seasonService.getAllSeasons).toHaveBeenCalledWith(emptyFilters);
      expect(result).toEqual(emptyResponse);
    });
  });
});
