import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { ERROR_MESSAGES } from './errors-messages.const';

@Injectable()
export class DatabaseExceptions {
  formatMessage(message: string, context?: string) {
    const hasContext = context ? `(${context})` : '';
    return hasContext + message;
  }
  handleDatabaseError(error: any, context?: string): never {
    if (error instanceof HttpException) {
      throw error;
    }

    if (error instanceof QueryFailedError) {
      switch (error.driverError.code) {
        case '02000':
          throw new BadRequestException(
            this.formatMessage(ERROR_MESSAGES.NO_DATA_FOUND, context),
          );
        case '22001':
          throw new BadRequestException(
            this.formatMessage(ERROR_MESSAGES.TOO_LONG_STRING, context),
          );
        case '22003':
          throw new BadRequestException(
            this.formatMessage(ERROR_MESSAGES.NUM_OUT_OF_RANGE, context),
          );
        case '22007':
          throw new BadRequestException(
            this.formatMessage(
              ERROR_MESSAGES.INVALIDE_DATETIME_FORMAT,
              context,
            ),
          );
        case '23001':
          throw new BadRequestException(
            this.formatMessage(ERROR_MESSAGES.RESTRICT_VIOLATION, context),
          );
        case '23502':
          throw new BadRequestException(
            this.formatMessage(ERROR_MESSAGES.NOT_NULL_VIOLATION, context),
          );
        case '23503':
          throw new BadRequestException(
            this.formatMessage(ERROR_MESSAGES.FK_VIOLATION, context),
          );
        case '23505':
          throw new ConflictException(
            this.formatMessage(ERROR_MESSAGES.UNIQUE_VIOLATION, context),
          );
        default:
          throw new InternalServerErrorException(
            this.formatMessage(ERROR_MESSAGES.OPERATION_FAILED, context),
          );
      }
    }

    throw new InternalServerErrorException(
      error.message || ERROR_MESSAGES.OPERATION_FAILED,
    );
  }
}
