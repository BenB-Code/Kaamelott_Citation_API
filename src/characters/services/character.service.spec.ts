import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { CharacterDto } from '../dto/character.dto';
import { Character } from '../entities/character.entity';
import { FilterCharacterParams } from '../params/filter-character.params';
import { DatabaseExceptions } from './../../common/exceptions/database-exceptions.service';
import { CharacterRepository } from './../repositories/character.repository';
import { CharacterService } from './character.service';

describe('CharacterService', () => {
  let characterService: CharacterService;
  let characterRepository: CharacterRepository;

  const mockCharacterDto: CharacterDto = {
    name: 'Arthur',
    picture: './path/to/my/profile-picture.png',
  };
  const mockCharacter = {
    id: 12,
    ...mockCharacterDto,
    createdAt: new Date('08-26-2025'),
    updatedAt: new Date('08-26-2025'),
  } as Character;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharacterService,
        {
          provide: CharacterRepository,
          useValue: {
            create: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
            selectOneBy: jest.fn(),
            selectBy: jest.fn(),
            associateCharacterActor: jest.fn(),
            dissociateCharacterActor: jest.fn(),
          },
        },
        DatabaseExceptions,
      ],
    }).compile();

    characterService = module.get<CharacterService>(CharacterService);
    characterRepository = module.get<CharacterRepository>(CharacterRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(characterService).toBeDefined();
  });

  describe('createCharacter', () => {
    it('should create the character', async () => {
      await characterService.createCharacter(mockCharacterDto);

      expect(characterRepository.create).toHaveBeenCalledTimes(1);
      expect(characterRepository.create).toHaveBeenCalledWith(mockCharacterDto);
    });

    it('should create the character and call associateCharacterActor', async () => {
      (characterRepository.create as jest.Mock).mockResolvedValue({
        ...mockCharacter,
        actorId: [{ id: 1 }],
      });

      await characterService.createCharacter({
        ...mockCharacterDto,
        actorId: 1,
      });

      expect(characterRepository.create).toHaveBeenCalledTimes(1);
      expect(characterRepository.create).toHaveBeenCalledWith({
        ...mockCharacterDto,
        actorId: 1,
      });
      expect(characterRepository.associateCharacterActor).toHaveBeenCalledTimes(
        1,
      );
      expect(characterRepository.associateCharacterActor).toHaveBeenCalledWith({
        characterId: 12,
        actorId: 1,
      });
    });

    it('should throw: [UNIQUE_VIOLATION]', async () => {
      const mockError = new QueryFailedError('', [], {
        code: '23505',
      } as any);
      (characterRepository.create as jest.Mock).mockRejectedValue(mockError);

      try {
        await characterService.createCharacter(mockCharacterDto);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.response.message).toBe(
          '(Character)[UNIQUE_VIOLATION] Cannot perform operation: Resource already exists',
        );
        expect(error.response.statusCode).toEqual(409);
      }
    });
  });

  describe('deleteCharacter', () => {
    it('should delete the character', async () => {
      (characterRepository.delete as jest.Mock).mockResolvedValue({
        raw: [],
        affected: 1,
      });

      const result = await characterService.deleteCharacter(12345);

      expect(result).toEqual({
        raw: [],
        affected: 1,
      });
      expect(characterRepository.delete).toHaveBeenCalledTimes(1);
      expect(characterRepository.delete).toHaveBeenCalledWith({ id: 12345 });
    });

    it('should throw exception as is', async () => {
      (characterRepository.delete as jest.Mock).mockRejectedValue(
        new InternalServerErrorException(),
      );

      try {
        await characterService.deleteCharacter(12345);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.status).toBe(500);
        expect(error.response.message).toBe('Internal Server Error');
      }
    });

    it('should throw: [NO_DATA_FOUND]', async () => {
      (characterRepository.delete as jest.Mock).mockResolvedValue({
        raw: [],
        affected: 0,
      });

      try {
        await characterService.deleteCharacter(12345);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.status).toBe(404);
        expect(error.response.message).toBe(
          '(Character)[NO_DATA_FOUND] Cannot perform operation: Data not found.',
        );
      }
    });
  });

  describe('editCharacter', () => {
    it('should return updated character', async () => {
      (characterRepository.selectOneBy as jest.Mock).mockResolvedValue(
        mockCharacter,
      );

      await characterService.editCharacter(mockCharacter.id, {
        name: 'Tested',
      });

      expect(characterRepository.update).toHaveBeenCalledTimes(1);
      expect(characterRepository.update).toHaveBeenCalledWith({
        ...mockCharacter,
        name: 'Tested',
      });
    });

    it('should throw: [NO_DATA_FOUND]', async () => {
      (characterRepository.selectOneBy as jest.Mock).mockRejectedValue(
        new EntityNotFoundError(Character, { id: 12345 }),
      );

      try {
        await characterService.editCharacter(12345, mockCharacterDto);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.status).toBe(404);
        expect(error.response.message).toBe(
          '(Character)[NO_DATA_FOUND] Cannot perform operation: Data not found.',
        );
      }
    });
  });

  describe('getSpecificCharacter', () => {
    it('should return the character', async () => {
      await characterService.getSpecificCharacter(1);

      expect(characterRepository.selectOneBy).toHaveBeenCalledTimes(1);
      expect(characterRepository.selectOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should throw: [NO_DATA_FOUND]', async () => {
      (characterRepository.selectOneBy as jest.Mock).mockRejectedValue(
        new EntityNotFoundError(Character, { id: 12345 }),
      );

      try {
        await characterService.getSpecificCharacter(12345);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.status).toBe(404);
        expect(error.response.message).toBe(
          '(Character)[NO_DATA_FOUND] Cannot perform operation: Data not found.',
        );
      }
    });
  });

  describe('getAllCharacters', () => {
    const mockCharacters = [mockCharacter];
    const mockCount = 1;

    it('should return paginated characters with complex filters', async () => {
      const complexFilters = {
        search: 'test',
        name: 'Arthur',
        sortBy: 'createdAt',
        sortOrder: 'DESC',
        limit: 20,
        offset: 10,
      } as FilterCharacterParams;

      (characterRepository.selectBy as jest.Mock).mockResolvedValue([
        mockCharacters,
        mockCount,
      ]);

      const result = await characterService.getAllCharacters(complexFilters);

      expect(characterRepository.selectBy).toHaveBeenCalledTimes(1);
      expect(characterRepository.selectBy).toHaveBeenCalledWith(complexFilters);
      expect(result).toEqual({
        data: mockCharacters,
        metadata: {
          limit: complexFilters.limit,
          offset: complexFilters.offset,
          total: mockCount,
        },
      });
    });

    it('should return empty result when no characters found', async () => {
      const emptyFilters = { limit: 10, offset: 0 } as FilterCharacterParams;
      (characterRepository.selectBy as jest.Mock).mockResolvedValue([[], 0]);

      const result = await characterService.getAllCharacters(emptyFilters);

      expect(characterRepository.selectBy).toHaveBeenCalledTimes(1);
      expect(characterRepository.selectBy).toHaveBeenCalledWith(emptyFilters);
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
      const basicFilters = { limit: 10, offset: 0 } as FilterCharacterParams;
      (characterRepository.selectBy as jest.Mock).mockRejectedValue(mockError);

      try {
        await characterService.getAllCharacters(basicFilters);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('associateCharacterActor', () => {
    it('should call associateCharacterActor', async () => {
      await characterService.associateCharacterActor({
        characterId: 1,
        actorId: 1,
      });

      expect(characterRepository.associateCharacterActor).toHaveBeenCalledTimes(
        1,
      );
      expect(characterRepository.associateCharacterActor).toHaveBeenCalledWith({
        characterId: 1,
        actorId: 1,
      });
    });

    it('should throw [FK_VIOLATION]', async () => {
      try {
        const mockError = new QueryFailedError('', [], {
          code: '23503',
        } as any);
        (
          characterRepository.associateCharacterActor as jest.Mock
        ).mockRejectedValue(mockError);

        await characterService.associateCharacterActor({
          characterId: 1,
          actorId: 12345,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.response.message).toBe(
          '(Character)[FK_VIOLATION] Cannot perform operation: related data exists',
        );
        expect(error.response.statusCode).toEqual(400);
      }
    });
  });

  describe('dissociateCharacterActor', () => {
    it('should call dissociateCharacterActor', async () => {
      await characterService.dissociateCharacterActor({
        characterId: 1,
        actorId: 1,
      });

      expect(
        characterRepository.dissociateCharacterActor,
      ).toHaveBeenCalledTimes(1);
      expect(characterRepository.dissociateCharacterActor).toHaveBeenCalledWith(
        {
          characterId: 1,
          actorId: 1,
        },
      );
    });

    it('should throw [FK_VIOLATION]', async () => {
      try {
        const mockError = new QueryFailedError('', [], {
          code: '23503',
        } as any);
        (
          characterRepository.dissociateCharacterActor as jest.Mock
        ).mockRejectedValue(mockError);

        await characterService.dissociateCharacterActor({
          characterId: 1,
          actorId: 12345,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.response.message).toBe(
          '(Character)[FK_VIOLATION] Cannot perform operation: related data exists',
        );
        expect(error.response.statusCode).toEqual(400);
      }
    });
  });
});
