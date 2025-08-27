import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { ASC, DESC } from '../constants/sorting.constant';
import { PaginationParams } from '../pagination/pagination.params';

export class SearchFilterParams extends PaginationParams {
  @IsOptional()
  @IsString()
  @MinLength(3)
  search?: string;

  @IsOptional()
  @IsEnum([ASC, DESC])
  sortOrder?: typeof ASC | typeof DESC = DESC;
}
