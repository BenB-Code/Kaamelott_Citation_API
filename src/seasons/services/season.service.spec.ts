import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { SeasonDto } from '../dto/season.dto';
import { FilterSeasonParams } from '../params/filter-season.params';
import { DatabaseExceptions } from '../../common/exceptions/database-exceptions.service';
import { SeasonRepository } from '../repositories/season.repository';
import { SeasonService } from './season.service';
import { Season } from '../entities/season.entity';

describe('SeasonService', () => {
  let seasonService: SeasonService;
  let seasonRepository: SeasonRepository;

  const mockSeasonDto: SeasonDto = {
    showId: 1,
    name: 'Saison 1',
    picture: './path/to/my/profile-picture.png',
  };
  const mockSeason = {
    id: 12,
    name: mockSeasonDto.name,
    picture: mockSeasonDto.picture,
    show: { id: mockSeasonDto.showId },
    createdAt: new Date('08-26-2025'),
    updatedAt: new Date('08-26-2025'),
  } as Season;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeasonService,
        {
          provide: SeasonRepository,
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

    seasonService = module.get<SeasonService>(SeasonService);
    seasonRepository = module.get<SeasonRepository>(SeasonRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(seasonService).toBeDefined();
  });

  describe('createSeason', () => {
    it('should create the season', async () => {
      (seasonRepository.create as jest.Mock).mockResolvedValueOnce(mockSeason);

      await seasonService.createSeason(mockSeasonDto);

      expect(seasonRepository.create).toHaveBeenCalledTimes(1);
      expect(seasonRepository.create).toHaveBeenCalledWith(mockSeasonDto);
    });

    it('should throw: [UNIQUE_VIOLATION]', async () => {
      const mockError = new QueryFailedError('', [], {
        code: '23505',
      } as any);
      (seasonRepository.create as jest.Mock).mockRejectedValue(mockError);

      try {
        await seasonService.createSeason(mockSeasonDto);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.response.message).toBe(
          '(Season)[UNIQUE_VIOLATION] Cannot perform operation: Resource already exists',
        );
        expect(error.response.statusCode).toEqual(409);
      }
    });
  });

  describe('deleteSeason', () => {
    it('should delete the season', async () => {
      (seasonRepository.delete as jest.Mock).mockResolvedValue({
        raw: [],
        affected: 1,
      });

      const result = await seasonService.deleteSeason(12345);

      expect(result).toEqual({
        raw: [],
        affected: 1,
      });
      expect(seasonRepository.delete).toHaveBeenCalledTimes(1);
      expect(seasonRepository.delete).toHaveBeenCalledWith({ id: 12345 });
    });

    it('should throw exception as is', async () => {
      (seasonRepository.delete as jest.Mock).mockRejectedValue(
        new InternalServerErrorException(),
      );

      try {
        await seasonService.deleteSeason(12345);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.status).toBe(500);
        expect(error.response.message).toBe('Internal Server Error');
      }
    });

    it('should throw: [NO_DATA_FOUND]', async () => {
      (seasonRepository.delete as jest.Mock).mockResolvedValue({
        raw: [],
        affected: 0,
      });

      try {
        await seasonService.deleteSeason(12345);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.status).toBe(404);
        expect(error.response.message).toBe(
          '(Season)[NO_DATA_FOUND] Cannot perform operation: Data not found.',
        );
      }
    });
  });

  describe('editSeason', () => {
    it('should return updated season', async () => {
      (seasonRepository.selectOneBy as jest.Mock).mockResolvedValue(mockSeason);

      await seasonService.editSeason(mockSeason.id, {
        name: 'Tested',
        showId: 3,
      });

      expect(seasonRepository.update).toHaveBeenCalledTimes(1);
      expect(seasonRepository.update).toHaveBeenCalledWith({
        ...mockSeason,
        name: 'Tested',
        showId: 3,
      });
    });

    it('should throw: [NO_DATA_FOUND]', async () => {
      (seasonRepository.selectOneBy as jest.Mock).mockRejectedValue(
        new EntityNotFoundError(Season, { id: 12345 }),
      );

      try {
        await seasonService.editSeason(12345, mockSeasonDto);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.status).toBe(404);
        expect(error.response.message).toBe(
          '(Season)[NO_DATA_FOUND] Cannot perform operation: Data not found.',
        );
      }
    });
  });

  describe('getSpecificSeason', () => {
    it('should return the season', async () => {
      await seasonService.getSpecificSeason(1);

      expect(seasonRepository.selectOneBy).toHaveBeenCalledTimes(1);
      expect(seasonRepository.selectOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should throw: [NO_DATA_FOUND]', async () => {
      (seasonRepository.selectOneBy as jest.Mock).mockRejectedValue(
        new EntityNotFoundError(Season, { id: 12345 }),
      );

      try {
        await seasonService.getSpecificSeason(12345);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.status).toBe(404);
        expect(error.response.message).toBe(
          '(Season)[NO_DATA_FOUND] Cannot perform operation: Data not found.',
        );
      }
    });
  });

  describe('getAllSeasons', () => {
    const mockSeasons = [mockSeason];
    const mockCount = 1;

    it('should return paginated seasons with complex filters', async () => {
      const complexFilters = {
        search: 'test',
        showId: 1,
        name: 'Saison 1',
        sortBy: 'createdAt',
        sortOrder: 'DESC',
        limit: 20,
        offset: 10,
      } as FilterSeasonParams;

      (seasonRepository.selectBy as jest.Mock).mockResolvedValue([
        mockSeasons,
        mockCount,
      ]);

      const result = await seasonService.getAllSeasons(complexFilters);

      expect(seasonRepository.selectBy).toHaveBeenCalledTimes(1);
      expect(seasonRepository.selectBy).toHaveBeenCalledWith(complexFilters);
      expect(result).toEqual({
        data: mockSeasons,
        metadata: {
          limit: complexFilters.limit,
          offset: complexFilters.offset,
          total: mockCount,
        },
      });
    });

    it('should return empty result when no seasons found', async () => {
      const emptyFilters = { limit: 10, offset: 0 } as FilterSeasonParams;
      (seasonRepository.selectBy as jest.Mock).mockResolvedValue([[], 0]);

      const result = await seasonService.getAllSeasons(emptyFilters);

      expect(seasonRepository.selectBy).toHaveBeenCalledTimes(1);
      expect(seasonRepository.selectBy).toHaveBeenCalledWith(emptyFilters);
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
      const basicFilters = { limit: 10, offset: 0 } as FilterSeasonParams;
      (seasonRepository.selectBy as jest.Mock).mockRejectedValue(mockError);

      try {
        await seasonService.getAllSeasons(basicFilters);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });
});
