import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseExceptions } from '../common/exceptions/database-exceptions.service';
import { SeasonController } from './controllers/season.controller';
import { SeasonRepository } from './repositories/season.repository';
import { SeasonService } from './services/season.service';
import { Season } from './entities/season.entity';

@Module({
  controllers: [SeasonController],
  imports: [TypeOrmModule.forFeature([Season])],
  providers: [SeasonService, SeasonRepository, DatabaseExceptions],
})
export class SeasonModule {}
