import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { ASC, DESC } from '../constants/sorting.constant';

export class SearchFilterParams {
  @IsOptional()
  @IsString()
  @MinLength(3)
  search?: string;

  @IsOptional()
  @IsEnum([ASC, DESC])
  sortOrder?: string;
}
