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
import { SeasonDto } from '../dto/season.dto';
import { UpdateSeasonDto } from '../dto/update-season.dto';
import { FilterSeasonParams } from '../params/filter-season.params';
import { SeasonService } from '../services/season.service';
import { Season } from '../entities/season.entity';

@Controller('season')
export class SeasonController {
  constructor(private readonly seasonService: SeasonService) {}

  @Get()
  getAllSeasons(@Query() filters: FilterSeasonParams): Promise<PaginationResponse<Season>> {
    return this.seasonService.getAllSeasons(filters);
  }

  @Get(':id')
  getSpecificSeason(@Param('id', ParseIntPipe) id: number): Promise<Season> {
    return this.seasonService.getSpecificSeason(id);
  }

  @Patch(':id')
  editSpecificSeason(
    @Param('id', ParseIntPipe) id: number,
    @Body() seasonDto: UpdateSeasonDto,
  ): Promise<Season> {
    return this.seasonService.editSeason(id, seasonDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteSpecificSeason(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.seasonService.deleteSeason(id);
  }

  @Post()
  createSeason(@Body() seasonDto: SeasonDto): Promise<Season> {
    return this.seasonService.createSeason(seasonDto);
  }
}
