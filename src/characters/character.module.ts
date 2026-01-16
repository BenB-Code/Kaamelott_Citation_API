import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterController } from './controllers/character.controller';
import { Character } from './entities/character.entity';
import { CharacterRepository } from './repositories/character.repository';
import { CharacterService } from './services/character.service';
import { DatabaseExceptions } from '../common/exceptions';

@Module({
  controllers: [CharacterController],
  imports: [TypeOrmModule.forFeature([Character])],
  providers: [CharacterService, CharacterRepository, DatabaseExceptions],
})
export class CharacterModule {}
