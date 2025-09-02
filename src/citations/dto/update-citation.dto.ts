import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateCitationDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  text?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  actorsId?: number[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  authorsId?: number[];

  @IsOptional()
  @IsNumber()
  characterId?: number;

  @IsOptional()
  @IsNumber()
  episodeId?: number;

  @IsOptional()
  @IsNumber()
  movieId?: number;
}
