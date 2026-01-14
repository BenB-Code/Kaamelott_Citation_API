import { Injectable } from '@nestjs/common';
import { CitationRepository } from '../repositories/citation.repository';
import { DatabaseExceptions } from '../../common/exceptions/database-exceptions.service';
import { DeleteResult } from 'typeorm';
import { Citation } from '../entities/citation.entity';
import { CitationDto } from '../dto/citation.dto';
import { CitationWithField } from '../types/citation-with-field.type';
import { FilterCitationParams } from '../params/filter-citation.params';
import { PaginationResponse } from '../../common/pagination/pagination.response';
import { UpdateCitationDto } from '../dto/update-citation.dto';

@Injectable()
export class CitationService {
  context = 'Citation';

  constructor(
    private readonly citationRepository: CitationRepository,
    private readonly databaseExceptions: DatabaseExceptions,
  ) {}

  async getAllCitations(filters: FilterCitationParams): Promise<PaginationResponse<Citation>> {
    try {
      const [citations, total] = await this.citationRepository.selectBy(filters);
      return {
        data: citations,
        metadata: {
          limit: filters.limit,
          offset: filters.offset,
          total,
        },
      };
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }

  async getSpecificCitation(id: number): Promise<Citation> {
    try {
      return await this.citationRepository.selectOneBy({ id });
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }

  async editCitation(id: number, citationDto: UpdateCitationDto): Promise<Citation> {
    try {
      const citation = await this.citationRepository.selectOneBy({ id });
      Object.assign(citation, citationDto);
      return await this.citationRepository.update(citation);
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }

  async createCitation(citation: CitationDto): Promise<Citation> {
    try {
      const createdCitation = await this.citationRepository.create(citation);

      for (const actorId of citation.actorsId) {
        await this.associateCitationWithField(
          {
            citationId: createdCitation.id,
            fieldId: actorId,
          },

          'actors',
        );
      }
      for (const authorId of citation.authorsId) {
        await this.associateCitationWithField(
          {
            citationId: createdCitation.id,
            fieldId: authorId,
          },
          'authors',
        );
      }
      return await this.citationRepository.selectOneBy({
        id: createdCitation.id,
      });
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }

  async deleteSpecificCitation(id: number): Promise<DeleteResult> {
    try {
      const citationToDelete = await this.citationRepository.selectOneBy({
        id,
      });
      for (const actor of citationToDelete.actors) {
        await this.dissociateCitationWithField(
          {
            citationId: id,
            fieldId: actor.id,
          },
          'actors',
        );
      }
      for (const author of citationToDelete.authors) {
        await this.dissociateCitationWithField(
          {
            citationId: id,
            fieldId: author.id,
          },
          'authors',
        );
      }
      return await this.citationRepository.delete({ id });
    } catch (error) {
      this.databaseExceptions.handleDatabaseError(error, this.context);
    }
  }

  async associateCitationWithField(ids: CitationWithField, fieldName: string): Promise<void> {
    await this.citationRepository.associateCitationWithField(ids, fieldName);
  }

  async dissociateCitationWithField(ids: CitationWithField, fieldName: string): Promise<void> {
    await this.citationRepository.dissociateCitationWithField(ids, fieldName);
  }
}
