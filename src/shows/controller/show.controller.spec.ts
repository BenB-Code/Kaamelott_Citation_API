import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '../../common/pagination/pagination.response';
import { MediaType } from '../constant/media-type.enum';
import { ShowDto } from '../dto/show.dto';
import { Show } from '../entities/show.entity';
import { FilterShowParams } from '../params/filter-show.params';
import { ShowService } from '../services/show.service';
import { ShowController } from './show.controller';

describe('ShowController', () => {
  let showService: ShowService;
  let showController: ShowController;

  const mockShowDto: ShowDto = {
    name: 'kaamelott',
    mediaType: MediaType.FILM,
  };

  const mockShow = {
    id: 1,
    ...mockShowDto,
    createdAt: new Date('2025-08-26'),
    updatedAt: new Date('2025-08-26'),
  } as Show;

  const mockPaginationResponse: PaginationResponse<Show> = {
    data: [mockShow],
    metadata: {
      limit: 100,
      offset: 0,
      total: 1,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShowController,
        {
          provide: ShowService,
          useValue: {
            createShow: jest.fn(),
            getAllShows: jest.fn(),
            deleteShow: jest.fn(),
            editShow: jest.fn(),
            getSpecificShow: jest.fn(),
          },
        },
      ],
    }).compile();

    showController = module.get<ShowController>(ShowController);
    showService = module.get<ShowService>(ShowService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(showController).toBeDefined();
  });

  it('should call create', async () => {
    await showController.createShow(mockShowDto);

    expect(showService.createShow).toHaveBeenCalledTimes(1);
    expect(showService.createShow).toHaveBeenCalledWith(mockShowDto);
  });

  it('should call delete', async () => {
    await showController.deleteSpecificShow(1);

    expect(showService.deleteShow).toHaveBeenCalledTimes(1);
    expect(showService.deleteShow).toHaveBeenCalledWith(1);
  });

  it('should call editShow', async () => {
    await showController.editSpecificShow(1, mockShowDto);

    expect(showService.editShow).toHaveBeenCalledTimes(1);
    expect(showService.editShow).toHaveBeenCalledWith(1, mockShowDto);
  });

  it('should call getSpecificShow', async () => {
    await showController.getSpecificShow(1);

    expect(showService.getSpecificShow).toHaveBeenCalledTimes(1);
    expect(showService.getSpecificShow).toHaveBeenLastCalledWith(1);
  });

  describe('getAllShows', () => {
    it('should call getAllShows and return paginated response with complex filters', async () => {
      const complexFilters = {
        search: 'test',
        name: 'kaamelott',
        mediaType: MediaType.FILM,
        limit: 10,
        offset: 20,
        sortBy: 'name',
        sortOrder: 'ASC',
      } as FilterShowParams;

      (showService.getAllShows as jest.Mock).mockResolvedValue(mockPaginationResponse);

      const result = await showController.getAllShows(complexFilters);

      expect(showService.getAllShows).toHaveBeenCalledTimes(1);
      expect(showService.getAllShows).toHaveBeenCalledWith(complexFilters);
      expect(result).toEqual(mockPaginationResponse);
    });

    it('should call getAllShows with empty filters', async () => {
      const emptyFilters = {} as FilterShowParams;
      const emptyResponse = {
        data: [],
        metadata: { limit: 100, offset: 0, total: 0 },
      };
      (showService.getAllShows as jest.Mock).mockResolvedValue(emptyResponse);

      const result = await showController.getAllShows(emptyFilters);

      expect(showService.getAllShows).toHaveBeenCalledTimes(1);
      expect(showService.getAllShows).toHaveBeenCalledWith(emptyFilters);
      expect(result).toEqual(emptyResponse);
    });
  });
});
