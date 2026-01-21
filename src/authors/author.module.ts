import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorController } from './controllers/author.controller';
import { Author } from './entities/author.entity';
import { AuthorRepository } from './repositories/author.repository';
import { AuthorService } from './services/author.service';
import { DatabaseExceptions } from '../common/exceptions';

@Module({
  controllers: [AuthorController],
  imports: [TypeOrmModule.forFeature([Author])],
  providers: [AuthorService, AuthorRepository, DatabaseExceptions],
})
export class AuthorModule {}
