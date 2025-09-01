import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { EpisodeDto } from '../dto/episode.dto';
import { FilterEpisodeParams } from '../params/filter-episode.params';
import { DatabaseExceptions } from '../../common/exceptions/database-exceptions.service';
import { EpisodeRepository } from '../repositories/episode.repository';
import { EpisodeService } from './episode.service';
import { Episode } from '../entities/episode.entity';

describe('EpisodeService', () => {
  let episodeService: EpisodeService;
  let episodeRepository: EpisodeRepository;

  const mockEpisodeDto: EpisodeDto = {
    seasonId: 1,
    name: 'Épisode 1',
    number: 1,
    picture: './path/to/my/profile-picture.png',
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EpisodeService,
        {
          provide: EpisodeRepository,
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

    episodeService = module.get<EpisodeService>(EpisodeService);
    episodeRepository = module.get<EpisodeRepository>(EpisodeRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(episodeService).toBeDefined();
  });

  describe('createEpisode', () => {
    it('should create the episode', async () => {
      await episodeService.createEpisode(mockEpisodeDto);

      expect(episodeRepository.create).toHaveBeenCalledTimes(1);
      expect(episodeRepository.create).toHaveBeenCalledWith(mockEpisodeDto);
    });

    it('should throw: [UNIQUE_VIOLATION]', async () => {
      const mockError = new QueryFailedError('', [], {
        code: '23505',
      } as any);
      (episodeRepository.create as jest.Mock).mockRejectedValue(mockError);

      try {
        await episodeService.createEpisode(mockEpisodeDto);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.response.message).toBe(
          '(Episode)[UNIQUE_VIOLATION] Cannot perform operation: Resource already exists',
        );
        expect(error.response.statusCode).toEqual(409);
      }
    });
  });

  describe('deleteEpisode', () => {
    it('should delete the episode', async () => {
      (episodeRepository.delete as jest.Mock).mockResolvedValue({
        raw: [],
        affected: 1,
      });

      const result = await episodeService.deleteEpisode(12345);

      expect(result).toEqual({
        raw: [],
        affected: 1,
      });
      expect(episodeRepository.delete).toHaveBeenCalledTimes(1);
      expect(episodeRepository.delete).toHaveBeenCalledWith({ id: 12345 });
    });

    it('should throw exception as is', async () => {
      (episodeRepository.delete as jest.Mock).mockRejectedValue(
        new InternalServerErrorException(),
      );

      try {
        await episodeService.deleteEpisode(12345);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.status).toBe(500);
        expect(error.response.message).toBe('Internal Server Error');
      }
    });

    it('should throw: [NO_DATA_FOUND]', async () => {
      (episodeRepository.delete as jest.Mock).mockResolvedValue({
        raw: [],
        affected: 0,
      });

      try {
        await episodeService.deleteEpisode(12345);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.status).toBe(404);
        expect(error.response.message).toBe(
          '(Episode)[NO_DATA_FOUND] Cannot perform operation: Data not found.',
        );
      }
    });
  });

  describe('editEpisode', () => {
    it('should return updated episode', async () => {
      (episodeRepository.selectOneBy as jest.Mock).mockResolvedValue(
        mockEpisode,
      );

      await episodeService.editEpisode(mockEpisode.id, {
        name: 'Tested',
        seasonId: 3,
      });

      expect(episodeRepository.update).toHaveBeenCalledTimes(1);
      expect(episodeRepository.update).toHaveBeenCalledWith({
        ...mockEpisode,
        name: 'Tested',
        seasonId: 3,
      });
    });

    it('should throw: [NO_DATA_FOUND]', async () => {
      (episodeRepository.selectOneBy as jest.Mock).mockRejectedValue(
        new EntityNotFoundError(Episode, { id: 12345 }),
      );

      try {
        await episodeService.editEpisode(12345, mockEpisodeDto);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.status).toBe(404);
        expect(error.response.message).toBe(
          '(Episode)[NO_DATA_FOUND] Cannot perform operation: Data not found.',
        );
      }
    });
  });

  describe('getSpecificEpisode', () => {
    it('should return the episode', async () => {
      await episodeService.getSpecificEpisode(1);

      expect(episodeRepository.selectOneBy).toHaveBeenCalledTimes(1);
      expect(episodeRepository.selectOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should throw: [NO_DATA_FOUND]', async () => {
      (episodeRepository.selectOneBy as jest.Mock).mockRejectedValue(
        new EntityNotFoundError(Episode, { id: 12345 }),
      );

      try {
        await episodeService.getSpecificEpisode(12345);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.status).toBe(404);
        expect(error.response.message).toBe(
          '(Episode)[NO_DATA_FOUND] Cannot perform operation: Data not found.',
        );
      }
    });
  });

  describe('getAllEpisodes', () => {
    const mockEpisodes = [mockEpisode];
    const mockCount = 1;

    it('should return paginated episodes with complex filters', async () => {
      const complexFilters = {
        search: 'test',
        seasonId: 1,
        name: 'Épisode 1',
        number: 1,
        sortBy: 'createdAt',
        sortOrder: 'DESC',
        limit: 20,
        offset: 10,
      } as FilterEpisodeParams;

      (episodeRepository.selectBy as jest.Mock).mockResolvedValue([
        mockEpisodes,
        mockCount,
      ]);

      const result = await episodeService.getAllEpisodes(complexFilters);

      expect(episodeRepository.selectBy).toHaveBeenCalledTimes(1);
      expect(episodeRepository.selectBy).toHaveBeenCalledWith(complexFilters);
      expect(result).toEqual({
        data: mockEpisodes,
        metadata: {
          limit: complexFilters.limit,
          offset: complexFilters.offset,
          total: mockCount,
        },
      });
    });

    it('should return empty result when no episodes found', async () => {
      const emptyFilters = { limit: 10, offset: 0 } as FilterEpisodeParams;
      (episodeRepository.selectBy as jest.Mock).mockResolvedValue([[], 0]);

      const result = await episodeService.getAllEpisodes(emptyFilters);

      expect(episodeRepository.selectBy).toHaveBeenCalledTimes(1);
      expect(episodeRepository.selectBy).toHaveBeenCalledWith(emptyFilters);
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
      const basicFilters = { limit: 10, offset: 0 } as FilterEpisodeParams;
      (episodeRepository.selectBy as jest.Mock).mockRejectedValue(mockError);

      try {
        await episodeService.getAllEpisodes(basicFilters);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });
});
