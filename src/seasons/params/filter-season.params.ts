import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import {
  CREATED_AT,
  NAME,
  UPDATED_AT,
} from '../../common/constants/filters.constant';
import { SearchFilterParams } from '../../common/params/search-filter.params';

export class FilterSeasonParams extends SearchFilterParams {
  @IsOptional()
  @IsNumber()
  showId?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsIn([CREATED_AT, UPDATED_AT, NAME])
  sortBy?: string = CREATED_AT;
}
