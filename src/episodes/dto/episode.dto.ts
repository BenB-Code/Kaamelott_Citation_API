import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class EpisodeDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  seasonId: number;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(150)
  name?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  number?: number;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  picture?: string;
}
