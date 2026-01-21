import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { ASC, DESC } from '../constants';
import { PaginationParams } from '../pagination';

export class SearchFilterParams extends PaginationParams {
  @IsOptional()
  @IsString()
  @MinLength(3)
  search?: string;

  @IsOptional()
  @IsEnum([ASC, DESC])
  sortOrder?: typeof ASC | typeof DESC = DESC;
}
