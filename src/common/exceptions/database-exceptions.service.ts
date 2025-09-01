import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
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
          throw new NotFoundException({
            error: HttpErrorByCode[HttpStatus.NOT_FOUND].name,
            message: this.formatMessage(ERROR_MESSAGES.NO_DATA_FOUND, context),
            statusCode: HttpStatus.NOT_FOUND,
            cause: error.driverError.detail,
          });
        case '22001':
          throw new BadRequestException({
            error: HttpErrorByCode[HttpStatus.BAD_REQUEST].name,
            message: this.formatMessage(
              ERROR_MESSAGES.TOO_LONG_STRING,
              context,
            ),
            statusCode: HttpStatus.BAD_REQUEST,
            cause: error.driverError.detail,
          });
        case '22003':
          throw new BadRequestException({
            error: HttpErrorByCode[HttpStatus.BAD_REQUEST].name,
            message: this.formatMessage(
              ERROR_MESSAGES.NUM_OUT_OF_RANGE,
              context,
            ),
            statusCode: HttpStatus.BAD_REQUEST,
            cause: error.driverError.detail,
          });
        case '22007':
          throw new BadRequestException({
            error: HttpErrorByCode[HttpStatus.BAD_REQUEST].name,
            message: this.formatMessage(
              ERROR_MESSAGES.INVALID_DATETIME_FORMAT,
              context,
            ),
            statusCode: HttpStatus.BAD_REQUEST,
            cause: error.driverError.detail,
          });
        case '23001':
          throw new BadRequestException({
            error: HttpErrorByCode[HttpStatus.BAD_REQUEST].name,
            message: this.formatMessage(
              ERROR_MESSAGES.RESTRICT_VIOLATION,
              context,
            ),
            statusCode: HttpStatus.BAD_REQUEST,
            cause: error.driverError.detail,
          });
        case '23502':
          throw new BadRequestException({
            error: HttpErrorByCode[HttpStatus.BAD_REQUEST].name,
            message: this.formatMessage(
              ERROR_MESSAGES.NOT_NULL_VIOLATION,
              context,
            ),
            statusCode: HttpStatus.BAD_REQUEST,
            cause: error.driverError.detail,
          });
        case '23503':
          throw new BadRequestException({
            error: HttpErrorByCode[HttpStatus.BAD_REQUEST].name,
            message: this.formatMessage(ERROR_MESSAGES.FK_VIOLATION, context),
            statusCode: HttpStatus.BAD_REQUEST,
            cause: error.driverError.detail,
          });
        case '23505':
          throw new ConflictException({
            error: HttpErrorByCode[HttpStatus.CONFLICT].name,
            message: this.formatMessage(
              ERROR_MESSAGES.UNIQUE_VIOLATION,
              context,
            ),
            statusCode: HttpStatus.CONFLICT,
            cause: error.driverError.detail,
          });
        default:
          throw new InternalServerErrorException({
            error: HttpErrorByCode[HttpStatus.INTERNAL_SERVER_ERROR].name,
            message: this.formatMessage(
              ERROR_MESSAGES.OPERATION_FAILED,
              context,
            ),
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            cause: error.driverError.detail,
          });
      }
    }

    if (error instanceof EntityNotFoundError) {
      throw new NotFoundException({
        error: HttpErrorByCode[HttpStatus.NOT_FOUND].name,
        message: this.formatMessage(ERROR_MESSAGES.NO_DATA_FOUND, context),
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    throw new InternalServerErrorException(
      error.message || ERROR_MESSAGES.OPERATION_FAILED,
    );
  }
}
