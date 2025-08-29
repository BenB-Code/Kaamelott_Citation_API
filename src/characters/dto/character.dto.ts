import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CharacterDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(75)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  picture?: string;

  @IsOptional()
  @IsNumber()
  actorId?: number;
}
