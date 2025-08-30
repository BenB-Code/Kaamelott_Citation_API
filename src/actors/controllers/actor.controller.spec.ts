import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '../../common/pagination/pagination.response';
import { ActorDto } from '../dto/actor.dto';
import { Actor } from '../entities/actor.entity';
import { FilterActorParams } from '../params/filter-actor.params';
import { ActorService } from '../services/actor.service';
import { ActorController } from './actor.controller';

describe('ActorController', () => {
  let actorService: ActorService;
  let actorController: ActorController;

  const mockActorDto: ActorDto = {
    firstName: 'Alexandre',
    lastName: 'Astier',
    picture: 'path/to/picture',
  };

  const mockActor = {
    id: 1,
    ...mockActorDto,
    createdAt: new Date('2025-08-26'),
    updatedAt: new Date('2025-08-26'),
  } as Actor;

  const mockPaginationResponse: PaginationResponse<Actor> = {
    data: [mockActor],
    metadata: {
      limit: 100,
      offset: 0,
      total: 1,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActorController,
        {
          provide: ActorService,
          useValue: {
            createActor: jest.fn(),
            getAllActors: jest.fn(),
            deleteActor: jest.fn(),
            editActor: jest.fn(),
            getSpecificActor: jest.fn(),
          },
        },
      ],
    }).compile();

    actorController = module.get<ActorController>(ActorController);
    actorService = module.get<ActorService>(ActorService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(actorController).toBeDefined();
  });

  it('should call create', async () => {
    await actorController.createActor(mockActorDto);

    expect(actorService.createActor).toHaveBeenCalledTimes(1);
    expect(actorService.createActor).toHaveBeenCalledWith(mockActorDto);
  });

  it('should call delete', async () => {
    await actorController.deleteSpecificActor(1);

    expect(actorService.deleteActor).toHaveBeenCalledTimes(1);
    expect(actorService.deleteActor).toHaveBeenCalledWith(1);
  });

  it('should call editActor', async () => {
    await actorController.editSpecificActor(1, mockActorDto);

    expect(actorService.editActor).toHaveBeenCalledTimes(1);
    expect(actorService.editActor).toHaveBeenCalledWith(1, mockActorDto);
  });

  it('should call getSpecificActor', async () => {
    await actorController.getSpecificActor(1);

    expect(actorService.getSpecificActor).toHaveBeenCalledTimes(1);
    expect(actorService.getSpecificActor).toHaveBeenLastCalledWith(1);
  });

  describe('getAllActors', () => {
    it('should call getAllActors and return paginated response with complex filters', async () => {
      const complexFilters = {
        search: 'test',
        firstName: 'Alexandre',
        lastName: 'Astier',
        limit: 10,
        offset: 20,
        sortBy: 'firstName',
        sortOrder: 'ASC',
      } as FilterActorParams;

      (actorService.getAllActors as jest.Mock).mockResolvedValue(
        mockPaginationResponse,
      );

      const result = await actorController.getAllActors(complexFilters);

      expect(actorService.getAllActors).toHaveBeenCalledTimes(1);
      expect(actorService.getAllActors).toHaveBeenCalledWith(complexFilters);
      expect(result).toEqual(mockPaginationResponse);
    });

    it('should call getAllActors with empty filters', async () => {
      const emptyFilters = {} as FilterActorParams;
      const emptyResponse = {
        data: [],
        metadata: { limit: 100, offset: 0, total: 0 },
      };
      (actorService.getAllActors as jest.Mock).mockResolvedValue(emptyResponse);

      const result = await actorController.getAllActors(emptyFilters);

      expect(actorService.getAllActors).toHaveBeenCalledTimes(1);
      expect(actorService.getAllActors).toHaveBeenCalledWith(emptyFilters);
      expect(result).toEqual(emptyResponse);
    });
  });
});
