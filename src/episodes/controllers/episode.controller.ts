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
import { FilterEpisodeParams } from '../params/filter-episode.params';
import { EpisodeService } from '../services/episode.service';
import { Episode } from '../entities/episode.entity';
import { PaginationResponse } from '../../common/pagination';
import { EpisodeDto, UpdateEpisodeDto } from '../dto';

@Controller('episode')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Get()
  getAllEpisodes(@Query() filters: FilterEpisodeParams): Promise<PaginationResponse<Episode>> {
    return this.episodeService.getAllEpisodes(filters);
  }

  @Get(':id')
  getSpecificEpisode(@Param('id', ParseIntPipe) id: number): Promise<Episode> {
    return this.episodeService.getSpecificEpisode(id);
  }

  @Patch(':id')
  editSpecificEpisode(
    @Param('id', ParseIntPipe) id: number,
    @Body() episodeDto: UpdateEpisodeDto,
  ): Promise<Episode> {
    return this.episodeService.editEpisode(id, episodeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteSpecificEpisode(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.episodeService.deleteEpisode(id);
  }

  @Post()
  createEpisode(@Body() episodeDto: EpisodeDto): Promise<Episode> {
    return this.episodeService.createEpisode(episodeDto);
  }
}
