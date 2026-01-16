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
import { Author } from '../entities/author.entity';
import { FilterAuthorParams } from '../params/filter-author.params';
import { AuthorService } from '../services/author.service';
import { PaginationResponse } from '../../common/pagination';
import { AuthorDto, UpdateAuthorDto } from '../dto';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  getAllAuthors(@Query() filters: FilterAuthorParams): Promise<PaginationResponse<Author>> {
    return this.authorService.getAllAuthors(filters);
  }

  @Get(':id')
  getSpecificAuthor(@Param('id', ParseIntPipe) id: number): Promise<Author> {
    return this.authorService.getSpecificAuthor(id);
  }

  @Patch(':id')
  editSpecificAuthor(
    @Param('id', ParseIntPipe) id: number,
    @Body() authorDto: UpdateAuthorDto,
  ): Promise<Author> {
    return this.authorService.editAuthor(id, authorDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteSpecificAuthor(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.authorService.deleteAuthor(id);
  }

  @Post()
  createAuthor(@Body() authorDto: AuthorDto): Promise<Author> {
    return this.authorService.createAuthor(authorDto);
  }
}
