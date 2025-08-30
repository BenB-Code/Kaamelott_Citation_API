import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '../../common/pagination/pagination.response';
import { CharacterDto } from '../dto/character.dto';
import { Character } from '../entities/character.entity';
import { FilterCharacterParams } from '../params/filter-character.params';
import { CharacterService } from '../services/character.service';
import { CharacterController } from './character.controller';

describe('CharacterController', () => {
  let characterService: CharacterService;
  let characterController: CharacterController;

  const mockCharacterDto: CharacterDto = {
    name: 'Arthur',
    picture: 'path/to/picture',
    actorId: 1,
  };

  const mockCharacter = {
    id: 1,
    ...mockCharacterDto,
    createdAt: new Date('2025-08-26'),
    updatedAt: new Date('2025-08-26'),
  } as Character;

  const mockPaginationResponse: PaginationResponse<Character> = {
    data: [mockCharacter],
    metadata: {
      limit: 100,
      offset: 0,
      total: 1,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharacterController,
        {
          provide: CharacterService,
          useValue: {
            createCharacter: jest.fn(),
            getAllCharacters: jest.fn(),
            deleteCharacter: jest.fn(),
            editCharacter: jest.fn(),
            getSpecificCharacter: jest.fn(),
            associateCharacterActor: jest.fn(),
            dissociateCharacterActor: jest.fn(),
          },
        },
      ],
    }).compile();

    characterController = module.get<CharacterController>(CharacterController);
    characterService = module.get<CharacterService>(CharacterService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(characterController).toBeDefined();
  });

  it('should call create', async () => {
    await characterController.createCharacter(mockCharacterDto);

    expect(characterService.createCharacter).toHaveBeenCalledTimes(1);
    expect(characterService.createCharacter).toHaveBeenCalledWith(
      mockCharacterDto,
    );
  });

  it('should call delete', async () => {
    await characterController.deleteSpecificCharacter(1);

    expect(characterService.deleteCharacter).toHaveBeenCalledTimes(1);
    expect(characterService.deleteCharacter).toHaveBeenCalledWith(1);
  });

  it('should call editCharacter', async () => {
    await characterController.editSpecificCharacter(1, mockCharacterDto);

    expect(characterService.editCharacter).toHaveBeenCalledTimes(1);
    expect(characterService.editCharacter).toHaveBeenCalledWith(
      1,
      mockCharacterDto,
    );
  });

  it('should call getSpecificCharacter', async () => {
    await characterController.getSpecificCharacter(1);

    expect(characterService.getSpecificCharacter).toHaveBeenCalledTimes(1);
    expect(characterService.getSpecificCharacter).toHaveBeenLastCalledWith(1);
  });

  describe('getAllCharacters', () => {
    it('should call getAllCharacters and return paginated response with complex filters', async () => {
      const complexFilters = {
        search: 'test',
        name: 'Arthur',
        limit: 10,
        offset: 20,
        sortBy: 'name',
        sortOrder: 'ASC',
      } as FilterCharacterParams;

      (characterService.getAllCharacters as jest.Mock).mockResolvedValue(
        mockPaginationResponse,
      );

      const result = await characterController.getAllCharacters(complexFilters);

      expect(characterService.getAllCharacters).toHaveBeenCalledTimes(1);
      expect(characterService.getAllCharacters).toHaveBeenCalledWith(
        complexFilters,
      );
      expect(result).toEqual(mockPaginationResponse);
    });

    it('should call getAllCharacters with empty filters', async () => {
      const emptyFilters = {} as FilterCharacterParams;
      const emptyResponse = {
        data: [],
        metadata: { limit: 100, offset: 0, total: 0 },
      };
      (characterService.getAllCharacters as jest.Mock).mockResolvedValue(
        emptyResponse,
      );

      const result = await characterController.getAllCharacters(emptyFilters);

      expect(characterService.getAllCharacters).toHaveBeenCalledTimes(1);
      expect(characterService.getAllCharacters).toHaveBeenCalledWith(
        emptyFilters,
      );
      expect(result).toEqual(emptyResponse);
    });
  });

  it('should call associateCharacterActor', async () => {
    await characterController.associateCharacterActor({
      characterId: 1,
      actorId: 1,
    });

    expect(characterService.associateCharacterActor).toHaveBeenCalledTimes(1);
    expect(characterService.associateCharacterActor).toHaveBeenCalledWith({
      characterId: 1,
      actorId: 1,
    });
  });

  it('should call dissociateCharacterActor', async () => {
    await characterController.dissociateCharacterActor({
      characterId: 1,
      actorId: 1,
    });

    expect(characterService.dissociateCharacterActor).toHaveBeenCalledTimes(1);
    expect(characterService.dissociateCharacterActor).toHaveBeenCalledWith({
      characterId: 1,
      actorId: 1,
    });
  });
});
