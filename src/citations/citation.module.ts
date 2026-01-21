import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitationController } from './controllers/citation.controller';
import { CitationService } from './services/citation.service';
import { Citation } from './entities/citation.entity';
import { CitationRepository } from './repositories/citation.repository';
import { DatabaseExceptions } from '../common/exceptions';

@Module({
  controllers: [CitationController],
  imports: [TypeOrmModule.forFeature([Citation])],
  providers: [CitationService, CitationRepository, DatabaseExceptions],
})
export class CitationModule {}
