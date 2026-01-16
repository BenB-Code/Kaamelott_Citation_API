import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowController } from './controllers/show.controller';
import { Show } from './entities/show.entity';
import { ShowRepository } from './repositories/show.repository';
import { ShowService } from './services/show.service';
import { DatabaseExceptions } from '../common/exceptions';

@Module({
  controllers: [ShowController],
  imports: [TypeOrmModule.forFeature([Show])],
  providers: [ShowService, ShowRepository, DatabaseExceptions],
})
export class ShowsModule {}
