import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class FindEpisodeDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsNumber()
  seasonId?: number;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(150)
  name?: string;

  @IsOptional()
  @IsNumber()
  number?: number;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  picture?: string;
}
