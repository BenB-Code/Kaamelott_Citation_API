import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CitationDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  text: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  actorsId: number[];

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  authorsId: number[];

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  characterId: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  episodeId?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  movieId?: number;
}
