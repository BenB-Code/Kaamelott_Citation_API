import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseExceptions } from './../common/exceptions/database-exceptions.service';
import { ShowsController } from './controller/shows.controller';
import { Show } from './entities/show.entity';
import { ShowRepository } from './repositories/show.repository';
import { ShowsService } from './services/shows.service';

@Module({
  controllers: [ShowsController],
  imports: [TypeOrmModule.forFeature([Show])],
  providers: [ShowsService, ShowRepository, DatabaseExceptions],
})
export class ShowsModule {}
