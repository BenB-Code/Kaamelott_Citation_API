import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class FindSeasonDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsNumber()
  showId?: number;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(75)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  picture?: string;
}
