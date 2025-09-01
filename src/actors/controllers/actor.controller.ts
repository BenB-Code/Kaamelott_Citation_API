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
import { ActorDto } from '../dto/actor.dto';
import { UpdateActorDto } from '../dto/update-actor.dto';
import { Actor } from '../entities/actor.entity';
import { FilterActorParams } from '../params/filter-actor.params';
import { ActorService } from '../services/actor.service';

@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}
  @Get()
  getAllActors(
    @Query() filters: FilterActorParams,
  ): Promise<PaginationResponse<Actor>> {
    return this.actorService.getAllActors(filters);
  }

  @Get(':id')
  getSpecificActor(@Param('id', ParseIntPipe) id: number): Promise<Actor> {
    return this.actorService.getSpecificActor(id);
  }

  @Patch(':id')
  editSpecificActor(
    @Param('id', ParseIntPipe) id: number,
    @Body() actorDto: UpdateActorDto,
  ): Promise<Actor> {
    return this.actorService.editActor(id, actorDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteSpecificActor(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return this.actorService.deleteActor(id);
  }

  @Post()
  createActor(@Body() actorDto: ActorDto): Promise<Actor> {
    return this.actorService.createActor(actorDto);
  }
}
