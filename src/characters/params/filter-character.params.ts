import { IsIn, IsOptional, IsString } from 'class-validator';
import { CREATED_AT, NAME, UPDATED_AT } from '../../common/constants/filters.constant';
import { SearchFilterParams } from '../../common/params/search-filter.params';

export class FilterCharacterParams extends SearchFilterParams {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsIn([CREATED_AT, UPDATED_AT, NAME])
  sortBy?: string = CREATED_AT;
}
