import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseExceptions } from '../common/exceptions/database-exceptions.service';
import { ShowController } from './controller/show.controller';
import { Show } from './entities/show.entity';
import { ShowRepository } from './repositories/show.repository';
import { ShowService } from './services/show.service';

@Module({
  controllers: [ShowController],
  imports: [TypeOrmModule.forFeature([Show])],
  providers: [ShowService, ShowRepository, DatabaseExceptions],
})
export class ShowsModule {}
