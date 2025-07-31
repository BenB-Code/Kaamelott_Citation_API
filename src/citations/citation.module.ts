import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitationController } from './citation.controller';
import { CitationService } from './citation.service';
import { Citation } from './entities/citation.entity';

@Module({
  controllers: [CitationController],
  imports: [TypeOrmModule.forFeature([Citation])],
  providers: [CitationService],
})
export class CitationModule {}
