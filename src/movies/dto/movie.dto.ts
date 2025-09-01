import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class MovieDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  showId: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(75)
  name: string;

  @IsNotEmpty()
  @IsDateString()
  releaseDate: string;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  picture?: string;
}
