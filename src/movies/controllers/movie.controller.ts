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
import { FilterMovieParams } from '../params/filter-movie.params';
import { MovieService } from '../services/movie.service';
import { Movie } from '../entities/movie.entity';
import { PaginationResponse } from '../../common/pagination';
import { MovieDto, UpdateMovieDto } from '../dto';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  getAllMovies(@Query() filters: FilterMovieParams): Promise<PaginationResponse<Movie>> {
    return this.movieService.getAllMovies(filters);
  }

  @Get(':id')
  getSpecificMovie(@Param('id', ParseIntPipe) id: number): Promise<Movie> {
    return this.movieService.getSpecificMovie(id);
  }

  @Patch(':id')
  editSpecificMovie(
    @Param('id', ParseIntPipe) id: number,
    @Body() movieDto: UpdateMovieDto,
  ): Promise<Movie> {
    return this.movieService.editMovie(id, movieDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteSpecificMovie(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.movieService.deleteMovie(id);
  }

  @Post()
  createMovie(@Body() movieDto: MovieDto): Promise<Movie> {
    return this.movieService.createMovie(movieDto);
  }
}
