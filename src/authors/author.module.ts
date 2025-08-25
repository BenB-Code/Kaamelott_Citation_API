import { DatabaseExceptions } from './../common/exceptions/database-exceptions.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogLevelEnum } from './../common/logger/models/log-level.enum';
import { Logger } from './../common/logger/services/logger.service';
import { AuthorController } from './controllers/author.controller';
import { AuthorService } from './services/author.service';
import { Author } from './entities/author.entity';

@Module({
  controllers: [AuthorController],
  imports: [TypeOrmModule.forFeature([Author])],
  providers: [
    AuthorService,
    {
      provide: Logger,
      useFactory: () =>
        Logger.getInstance({
          logLevel: LogLevelEnum.DEBUG,
          colorize: true,
        }),
    },
    DatabaseExceptions,
  ],
})
export class AuthorModule {}
