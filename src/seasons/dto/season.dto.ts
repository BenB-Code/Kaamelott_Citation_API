import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SeasonDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  showId: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(75)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  picture?: string;
}
