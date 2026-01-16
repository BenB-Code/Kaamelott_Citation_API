import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodeController } from './controllers/episode.controller';
import { EpisodeRepository } from './repositories/episode.repository';
import { EpisodeService } from './services/episode.service';
import { Episode } from './entities/episode.entity';
import { DatabaseExceptions } from '../common/exceptions';

@Module({
  controllers: [EpisodeController],
  imports: [TypeOrmModule.forFeature([Episode])],
  providers: [EpisodeService, EpisodeRepository, DatabaseExceptions],
})
export class EpisodeModule {}
