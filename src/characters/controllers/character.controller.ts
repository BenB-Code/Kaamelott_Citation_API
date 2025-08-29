import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { PaginationResponse } from '../../common/pagination/pagination.response';
import { CharacterDto } from '../dto/character.dto';
import { UpdateCharacterDto } from '../dto/update-character.dto';
import { Character } from '../entities/character.entity';
import { FilterCharacterParams } from '../params/filter-character.params';
import { CharacterService } from '../services/character.service';
import { CharacterActor } from '../types/character-actor.type';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}
  @Get()
  getAllCharacters(
    @Query() filters: FilterCharacterParams,
  ): Promise<PaginationResponse<Character>> {
    return this.characterService.getAllCharacters(filters);
  }

  @Get('/:id')
  getSpecificCharacter(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Character> {
    return this.characterService.getSpecificCharacter(id);
  }

  @Patch('/:id')
  editSpecificCharacter(
    @Param('id', ParseIntPipe) id: number,
    @Body() characterDto: UpdateCharacterDto,
  ): Promise<Character> {
    return this.characterService.editCharacter(id, characterDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteSpecificCharacter(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return this.characterService.deleteCharacter(id);
  }

  @Post()
  createCharacter(@Body() characterDto: CharacterDto): Promise<Character> {
    return this.characterService.createCharacter(characterDto);
  }

  @Post('/:characterId/actor/:actorId')
  @HttpCode(HttpStatus.CREATED)
  associateCharacterActor(@Param() params: CharacterActor): Promise<void> {
    return this.characterService.associateCharacterActor({
      characterId: +params.characterId,
      actorId: +params.actorId,
    });
  }

  @Delete('/:characterId/actor/:actorId')
  @HttpCode(HttpStatus.NO_CONTENT)
  dissociateCharacterActor(@Param() params: CharacterActor): Promise<void> {
    return this.characterService.dissociateCharacterActor({
      characterId: +params.characterId,
      actorId: +params.actorId,
    });
  }
}
