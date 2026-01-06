import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { ActorDto } from '../dto/actor.dto';
import { Actor } from '../entities/actor.entity';
import { FilterActorParams } from '../params/filter-actor.params';
import { DatabaseExceptions } from '../../common/exceptions/database-exceptions.service';
import { ActorRepository } from '../repositories/actor.repository';
import { ActorService } from './actor.service';

describe('ActorService', () => {
  let actorService: ActorService;
  let actorRepository: ActorRepository;

  const mockActorDto: ActorDto = {
    firstName: 'Alexandre',
    lastName: 'Astier',
    picture: './path/to/my/profile-picture.png',
  };
  const mockActor = {
    id: 12,
    ...mockActorDto,
    createdAt: new Date('08-26-2025'),
    updatedAt: new Date('08-26-2025'),
  } as Actor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActorService,
        {
          provide: ActorRepository,
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

    actorService = module.get<ActorService>(ActorService);
    actorRepository = module.get<ActorRepository>(ActorRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(actorService).toBeDefined();
  });

  describe('createActor', () => {
    it('should create the actor', async () => {
      await actorService.createActor(mockActorDto);

      expect(actorRepository.create).toHaveBeenCalledTimes(1);
      expect(actorRepository.create).toHaveBeenCalledWith(mockActorDto);
    });

    it('should throw: [UNIQUE_VIOLATION]', async () => {
      const mockError = new QueryFailedError('', [], {
        code: '23505',
      } as any);
      (actorRepository.create as jest.Mock).mockRejectedValue(mockError);

      try {
        await actorService.createActor(mockActorDto);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.response.message).toBe(
          '(Actor)[UNIQUE_VIOLATION] Cannot perform operation: Resource already exists',
        );
        expect(error.response.statusCode).toEqual(409);
      }
    });
  });

  describe('deleteActor', () => {
    it('should delete the actor', async () => {
      (actorRepository.delete as jest.Mock).mockResolvedValue({
        raw: [],
        affected: 1,
      });

      const result = await actorService.deleteActor(12345);

      expect(result).toEqual({
        raw: [],
        affected: 1,
      });
      expect(actorRepository.delete).toHaveBeenCalledTimes(1);
      expect(actorRepository.delete).toHaveBeenCalledWith({ id: 12345 });
    });

    it('should throw exception as is', async () => {
      (actorRepository.delete as jest.Mock).mockRejectedValue(new InternalServerErrorException());

      try {
        await actorService.deleteActor(12345);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.status).toBe(500);
        expect(error.response.message).toBe('Internal Server Error');
      }
    });

    it('should throw: [NO_DATA_FOUND]', async () => {
      (actorRepository.delete as jest.Mock).mockResolvedValue({
        raw: [],
        affected: 0,
      });

      try {
        await actorService.deleteActor(12345);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.status).toBe(404);
        expect(error.response.message).toBe(
          '(Actor)[NO_DATA_FOUND] Cannot perform operation: Data not found.',
        );
      }
    });
  });

  describe('editActor', () => {
    it('should return updated actor', async () => {
      (actorRepository.selectOneBy as jest.Mock).mockResolvedValue(mockActor);

      await actorService.editActor(mockActor.id, {
        firstName: 'Tested',
      });

      expect(actorRepository.update).toHaveBeenCalledTimes(1);
      expect(actorRepository.update).toHaveBeenCalledWith({
        ...mockActor,
        firstName: 'Tested',
      });
    });

    it('should throw: [NO_DATA_FOUND]', async () => {
      (actorRepository.selectOneBy as jest.Mock).mockRejectedValue(
        new EntityNotFoundError(Actor, { id: 12345 }),
      );

      try {
        await actorService.editActor(12345, mockActorDto);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.status).toBe(404);
        expect(error.response.message).toBe(
          '(Actor)[NO_DATA_FOUND] Cannot perform operation: Data not found.',
        );
      }
    });
  });

  describe('getSpecificActor', () => {
    it('should return the actor', async () => {
      await actorService.getSpecificActor(1);

      expect(actorRepository.selectOneBy).toHaveBeenCalledTimes(1);
      expect(actorRepository.selectOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should throw: [NO_DATA_FOUND]', async () => {
      (actorRepository.selectOneBy as jest.Mock).mockRejectedValue(
        new EntityNotFoundError(Actor, { id: 12345 }),
      );

      try {
        await actorService.getSpecificActor(12345);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.status).toBe(404);
        expect(error.response.message).toBe(
          '(Actor)[NO_DATA_FOUND] Cannot perform operation: Data not found.',
        );
      }
    });
  });

  describe('getAllActors', () => {
    const mockActors = [mockActor];
    const mockCount = 1;

    it('should return paginated actors with complex filters', async () => {
      const complexFilters = {
        search: 'test',
        firstName: 'Alexandre',
        lastName: 'Astier',
        sortBy: 'createdAt',
        sortOrder: 'DESC',
        limit: 20,
        offset: 10,
      } as FilterActorParams;

      (actorRepository.selectBy as jest.Mock).mockResolvedValue([mockActors, mockCount]);

      const result = await actorService.getAllActors(complexFilters);

      expect(actorRepository.selectBy).toHaveBeenCalledTimes(1);
      expect(actorRepository.selectBy).toHaveBeenCalledWith(complexFilters);
      expect(result).toEqual({
        data: mockActors,
        metadata: {
          limit: complexFilters.limit,
          offset: complexFilters.offset,
          total: mockCount,
        },
      });
    });

    it('should return empty result when no actors found', async () => {
      const emptyFilters = { limit: 10, offset: 0 } as FilterActorParams;
      (actorRepository.selectBy as jest.Mock).mockResolvedValue([[], 0]);

      const result = await actorService.getAllActors(emptyFilters);

      expect(actorRepository.selectBy).toHaveBeenCalledTimes(1);
      expect(actorRepository.selectBy).toHaveBeenCalledWith(emptyFilters);
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
      const basicFilters = { limit: 10, offset: 0 } as FilterActorParams;
      (actorRepository.selectBy as jest.Mock).mockRejectedValue(mockError);

      try {
        await actorService.getAllActors(basicFilters);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });
});
