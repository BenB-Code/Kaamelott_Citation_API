import { IsIn, IsOptional, IsString } from 'class-validator';
import { SearchFilterParams } from '../../common/params/search-filter..params';
import {
  CREATED_AT,
  FIRSTNAME,
  LASTNAME,
  UPDATED_AT,
} from '../../common/constants/filters.constant';

export class FilterAuthorParams extends SearchFilterParams {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsIn([CREATED_AT, UPDATED_AT, FIRSTNAME, LASTNAME])
  sortBy?: string = LASTNAME;
}
