import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseExceptions } from '../common/exceptions/database-exceptions.service';
import { EpisodeController } from './controllers/episode.controller';
import { EpisodeRepository } from './repositories/episode.repository';
import { EpisodeService } from './services/episode.service';
import { Episode } from './entities/episode.entity';

@Module({
  controllers: [EpisodeController],
  imports: [TypeOrmModule.forFeature([Episode])],
  providers: [EpisodeService, EpisodeRepository, DatabaseExceptions],
})
export class EpisodeModule {}
