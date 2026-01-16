import { IsIn, IsOptional, IsString } from 'class-validator';
import { SearchFilterParams } from '../../common/params/search-filter.params';
import { CREATED_AT, NAME, UPDATED_AT } from '../../common/constants';

export class FilterCharacterParams extends SearchFilterParams {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsIn([CREATED_AT, UPDATED_AT, NAME])
  sortBy?: string = CREATED_AT;
}
