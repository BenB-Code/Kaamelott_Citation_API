import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { ShowDto } from '../dto/show.dto';
import { Show } from '../entities/show.entity';
import { FilterShowParams } from '../params/filter-show.params';
import { DatabaseExceptions } from '../../common/exceptions/database-exceptions.service';
import { ShowRepository } from '../repositories/show.repository';
import { ShowService } from './show.service';
import { MediaType } from '../constant/media-type.enum';

describe('ShowService', () => {
  let showService: ShowService;
  let showRepository: ShowRepository;

  const mockShowDto: ShowDto = {
    name: 'Kaamelott',
    mediaType: MediaType.FILM,
  };
  const mockShow = {
    id: 12,
    ...mockShowDto,
    createdAt: new Date('08-26-2025'),
    updatedAt: new Date('08-26-2025'),
  } as Show;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShowService,
        {
          provide: ShowRepository,
          useValue: {
            create: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
            selectOneBy: jest.fn(),
            selectBy: jest.fn(),
          },
        },
        DatabaseExceptions,
      ],
    }).compile();

    showService = module.get<ShowService>(ShowService);
    showRepository = module.get<ShowRepository>(ShowRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(showService).toBeDefined();
  });

  describe('createShow', () => {
    it('should create the show', async () => {
      await showService.createShow(mockShowDto);

      expect(showRepository.create).toHaveBeenCalledTimes(1);
      expect(showRepository.create).toHaveBeenCalledWith(mockShowDto);
    });
  });

  it('should throw: [UNIQUE_VIOLATION]', async () => {
    const mockError = new QueryFailedError('', [], {
      code: '23505',
    } as any);
    (showRepository.create as jest.Mock).mockRejectedValue(mockError);

    try {
      await showService.createShow(mockShowDto);
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException);
      expect(error.response.message).toBe(
        '(Show)[UNIQUE_VIOLATION] Cannot perform operation: Resource already exists',
      );
      expect(error.response.statusCode).toEqual(409);
    }
  });

  describe('deleteShow', () => {
    it('should delete the show', async () => {
      (showRepository.delete as jest.Mock).mockResolvedValue({
        raw: [],
        affected: 1,
      });

      const result = await showService.deleteShow(12345);

      expect(result).toEqual({
        raw: [],
        affected: 1,
      });
      expect(showRepository.delete).toHaveBeenCalledTimes(1);
      expect(showRepository.delete).toHaveBeenCalledWith({ id: 12345 });
    });

    it('should throw exception as is', async () => {
      (showRepository.delete as jest.Mock).mockRejectedValue(new InternalServerErrorException());

      try {
        await showService.deleteShow(12345);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.status).toBe(500);
        expect(error.response.message).toBe('Internal Server Error');
      }
    });

    it('should throw: [NO_DATA_FOUND]', async () => {
      (showRepository.delete as jest.Mock).mockResolvedValue({
        raw: [],
        affected: 0,
      });

      try {
        await showService.deleteShow(12345);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.status).toBe(404);
        expect(error.response.message).toBe(
          '(Show)[NO_DATA_FOUND] Cannot perform operation: Data not found.',
        );
      }
    });
  });

  describe('editShow', () => {
    it('should return updated show', async () => {
      (showRepository.selectOneBy as jest.Mock).mockResolvedValue(mockShow);

      await showService.editShow(mockShow.id, {
        name: 'Tested',
      });

      expect(showRepository.update).toHaveBeenCalledTimes(1);
      expect(showRepository.update).toHaveBeenCalledWith({
        ...mockShow,
        name: 'Tested',
      });
    });

    it('should throw: [NO_DATA_FOUND]', async () => {
      (showRepository.selectOneBy as jest.Mock).mockRejectedValue(
        new EntityNotFoundError(Show, { id: 12345 }),
      );

      try {
        await showService.editShow(12345, mockShowDto);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.status).toBe(404);
        expect(error.response.message).toBe(
          '(Show)[NO_DATA_FOUND] Cannot perform operation: Data not found.',
        );
      }
    });
  });

  describe('getSpecificShow', () => {
    it('should return the show', async () => {
      await showService.getSpecificShow(1);

      expect(showRepository.selectOneBy).toHaveBeenCalledTimes(1);
      expect(showRepository.selectOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should throw: [NO_DATA_FOUND]', async () => {
      (showRepository.selectOneBy as jest.Mock).mockRejectedValue(
        new EntityNotFoundError(Show, { id: 12345 }),
      );

      try {
        await showService.getSpecificShow(12345);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.status).toBe(404);
        expect(error.response.message).toBe(
          '(Show)[NO_DATA_FOUND] Cannot perform operation: Data not found.',
        );
      }
    });
  });

  describe('getAllShows', () => {
    const mockShows = [mockShow];
    const mockCount = 1;

    it('should return paginated shows with complex filters', async () => {
      const complexFilters = {
        search: 'test',
        name: 'kaamelott',
        sortBy: 'createdAt',
        sortOrder: 'DESC',
        limit: 20,
        offset: 10,
      } as FilterShowParams;

      (showRepository.selectBy as jest.Mock).mockResolvedValue([mockShows, mockCount]);

      const result = await showService.getAllShows(complexFilters);

      expect(showRepository.selectBy).toHaveBeenCalledTimes(1);
      expect(showRepository.selectBy).toHaveBeenCalledWith(complexFilters);
      expect(result).toEqual({
        data: mockShows,
        metadata: {
          limit: complexFilters.limit,
          offset: complexFilters.offset,
          total: mockCount,
        },
      });
    });

    it('should return empty result when no shows found', async () => {
      const emptyFilters = { limit: 10, offset: 0 } as FilterShowParams;
      (showRepository.selectBy as jest.Mock).mockResolvedValue([[], 0]);

      const result = await showService.getAllShows(emptyFilters);

      expect(showRepository.selectBy).toHaveBeenCalledTimes(1);
      expect(showRepository.selectBy).toHaveBeenCalledWith(emptyFilters);
      expect(result).toEqual({
        data: [],
        metadata: {
          limit: emptyFilters.limit,
          offset: emptyFilters.offset,
          total: 0,
        },
      });
    });

    it('should throw database exception when repository throws error', async () => {
      const mockError = new Error('Database connection failed');
      const basicFilters = { limit: 10, offset: 0 } as FilterShowParams;
      (showRepository.selectBy as jest.Mock).mockRejectedValue(mockError);

      try {
        await showService.getAllShows(basicFilters);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });
});
