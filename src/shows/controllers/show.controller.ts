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
import { Show } from '../entities/show.entity';
import { FilterShowParams } from '../params/filter-show.params';
import { ShowService } from '../services/show.service';
import { PaginationResponse } from '../../common/pagination';
import { ShowDto, UpdateShowDto } from '../dto';

@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  @Get()
  getAllShows(@Query() filters: FilterShowParams): Promise<PaginationResponse<Show>> {
    return this.showService.getAllShows(filters);
  }

  @Get(':id')
  getSpecificShow(@Param('id', ParseIntPipe) id: number): Promise<Show> {
    return this.showService.getSpecificShow(id);
  }

  @Patch(':id')
  editSpecificShow(
    @Param('id', ParseIntPipe) id: number,
    @Body() showDto: UpdateShowDto,
  ): Promise<Show> {
    return this.showService.editShow(id, showDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteSpecificShow(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.showService.deleteShow(id);
  }

  @Post()
  createShow(@Body() showDto: ShowDto): Promise<Show> {
    return this.showService.createShow(showDto);
  }
}
