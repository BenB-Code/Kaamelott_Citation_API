import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { PaginationResponse } from '../../common/pagination/pagination.response';
import { FindByIdParams } from '../../common/params/find-by-id.params';
import { AuthorDto } from '../dto/author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { Author } from '../entities/author.entity';
import { FilterAuthorParams } from '../params/filter-author.params';
import { AuthorService } from '../services/author.service';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}
  @Get()
  getAllAuthors(
    @Query() filters: FilterAuthorParams,
  ): Promise<PaginationResponse<Author>> {
    return this.authorService.getAllAuthors(filters);
  }

  @Get('/:id')
  getSpecificAuthor(@Param() params: FindByIdParams): Promise<Author> {
    return this.authorService.getSpecificAuthor(params.id);
  }

  @Patch('/:id')
  editSpecificAuthor(
    @Param() params: FindByIdParams,
    @Body() authorDto: UpdateAuthorDto,
  ) {
    return this.authorService.editAuthor(params.id, authorDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteSpecificAuthor(@Param() params: FindByIdParams): Promise<DeleteResult> {
    return this.authorService.deleteAuthor(params.id);
  }

  @Post()
  createAuthor(@Body() authorDto: AuthorDto): Promise<Author> {
    return this.authorService.createAuthor(authorDto);
  }
}
