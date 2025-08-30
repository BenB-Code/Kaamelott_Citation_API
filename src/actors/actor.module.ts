import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseExceptions } from './../common/exceptions/database-exceptions.service';
import { ActorController } from './controllers/actor.controller';
import { Actor } from './entities/actor.entity';
import { ActorRepository } from './repositories/actor.repository';
import { ActorService } from './services/actor.service';

@Module({
  controllers: [ActorController],
  imports: [TypeOrmModule.forFeature([Actor])],
  providers: [ActorService, ActorRepository, DatabaseExceptions],
})
export class ActorModule {}
