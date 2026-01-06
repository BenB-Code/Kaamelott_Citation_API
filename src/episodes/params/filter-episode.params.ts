import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { CREATED_AT, NAME, NUMBER, UPDATED_AT } from '../../common/constants/filters.constant';
import { SearchFilterParams } from '../../common/params/search-filter.params';

export class FilterEpisodeParams extends SearchFilterParams {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  seasonId?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  number?: number;

  @IsOptional()
  @IsIn([CREATED_AT, UPDATED_AT, NAME, NUMBER])
  sortBy?: string = CREATED_AT;
}
