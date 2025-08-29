import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateCharacterDto {
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
