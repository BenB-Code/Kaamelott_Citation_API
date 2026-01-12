import { Type } from 'class-transformer';
import { IsDateString, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import {
  CREATED_AT,
  NAME,
  RELEASE_DATE,
  UPDATED_AT,
} from '../../common/constants/filters.constant';
import { SearchFilterParams } from '../../common/params/search-filter.params';

export class FilterMovieParams extends SearchFilterParams {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  showId?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDateString()
  releaseDate?: string;

  @IsOptional()
  @IsIn([CREATED_AT, UPDATED_AT, NAME, RELEASE_DATE])
  sortBy?: string = CREATED_AT;
}
