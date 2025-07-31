import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorController } from './actor.controller';
import { ActorService } from './actor.service';
import { Actor } from './entities/actor.entity';
import { Character } from './entities/character.entity';

@Module({
  controllers: [ActorController],
  imports: [TypeOrmModule.forFeature([Actor, Character])],
  providers: [ActorService],
})
export class ActorModule {}
