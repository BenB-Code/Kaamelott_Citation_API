import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseExceptions } from './../common/exceptions/database-exceptions.service';
import { AuthorController } from './controllers/author.controller';
import { Author } from './entities/author.entity';
import { AuthorRepository } from './repositories/author.repository';
import { AuthorService } from './services/author.service';

@Module({
  controllers: [AuthorController],
  imports: [TypeOrmModule.forFeature([Author])],
  providers: [AuthorService, AuthorRepository, DatabaseExceptions],
})
export class AuthorModule {}
