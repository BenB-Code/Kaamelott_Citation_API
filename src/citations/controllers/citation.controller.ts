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
import { CitationService } from '../services/citation.service';
import { FilterCitationParams } from '../params/filter-citation.params';
import { Citation } from '../entities/citation.entity';
import { DeleteResult } from 'typeorm';
import { CitationWithField } from '../types/citation-with-field.type';
import { USER_KEY } from '../../common/constants';
import { Roles } from '../../common/decorators';
import { PaginationResponse } from '../../common/pagination';
import { CitationDto, UpdateCitationDto } from '../dto';

@Controller('citation')
export class CitationController {
  constructor(private readonly citationService: CitationService) {}

  @Get()
  @Roles(USER_KEY)
  getAllCitation(@Query() filters: FilterCitationParams): Promise<PaginationResponse<Citation>> {
    return this.citationService.getAllCitations(filters);
  }

  @Get(':id')
  getSpecificCitation(@Param('id', ParseIntPipe) id: number): Promise<Citation> {
    return this.citationService.getSpecificCitation(id);
  }

  @Patch(':id')
  editSpecificCitation(
    @Param('id', ParseIntPipe) id: number,
    @Body() citation: UpdateCitationDto,
  ): Promise<Citation> {
    return this.citationService.editCitation(id, citation);
  }

  @Post()
  createCitation(@Body() citationDto: CitationDto): Promise<Citation> {
    return this.citationService.createCitation(citationDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteSpecificCitation(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.citationService.deleteSpecificCitation(id);
  }

  @Post(':citationId/actor/:fieldId')
  @HttpCode(HttpStatus.CREATED)
  associateCitationActor(@Param() ids: CitationWithField): Promise<void> {
    return this.citationService.associateCitationWithField(ids, 'actors');
  }

  @Delete(':citationId/actor/:fieldId')
  @HttpCode(HttpStatus.NO_CONTENT)
  dissociateCitationActor(@Param() ids: CitationWithField): Promise<void> {
    return this.citationService.dissociateCitationWithField(ids, 'actors');
  }

  @Post(':citationId/author/:fieldId')
  @HttpCode(HttpStatus.CREATED)
  associateCitationAuthor(@Param() ids: CitationWithField): Promise<void> {
    return this.citationService.associateCitationWithField(ids, 'authors');
  }

  @Delete(':citationId/author/:fieldId')
  @HttpCode(HttpStatus.NO_CONTENT)
  dissociateCitationAuthor(@Param() ids: CitationWithField): Promise<void> {
    return this.citationService.dissociateCitationWithField(ids, 'authors');
  }
}
