import { SearchFilterParams } from '../../common/params/search-filter.params';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import {
  CHARACTER_ID,
  CITATION_ID,
  CREATED_AT,
  EPISODE_ID,
  MOVIE_ID,
  UPDATED_AT,
} from '../../common/constants/filters.constant';

export class FilterCitationParams extends SearchFilterParams {
  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsNumber()
  episodeId?: number;

  @IsOptional()
  @IsNumber()
  movieId?: number;

  @IsOptional()
  @IsNumber()
  characterId?: number;

  @IsOptional()
  @IsIn([
    CREATED_AT,
    UPDATED_AT,
    EPISODE_ID,
    CHARACTER_ID,
    MOVIE_ID,
    CITATION_ID,
  ])
  sortBy: string = CREATED_AT;
}
