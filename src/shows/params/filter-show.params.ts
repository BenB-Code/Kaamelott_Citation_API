import {
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { MediaType } from '../constant/media-type.enum';
import { CREATED_AT, MEDIA_TYPE, NAME, UPDATED_AT } from '../../common/constants/filters.constant';
import { SearchFilterParams } from '../../common/params/search-filter.params';

export class FilterShowParams extends SearchFilterParams {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(75)
  name?: string;

  @IsOptional()
  @IsEnum(MediaType)
  mediaType?: MediaType;

  @IsOptional()
  @IsIn([CREATED_AT, UPDATED_AT, NAME, MEDIA_TYPE])
  sortBy?: string = CREATED_AT;
}
