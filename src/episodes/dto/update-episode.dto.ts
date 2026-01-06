import { IsNumber, IsOptional, IsPositive, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateEpisodeDto {
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

  @IsOptional()
  @IsNumber()
  @IsPositive()
  seasonId?: number;
}
