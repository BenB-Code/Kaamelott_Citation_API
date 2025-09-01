import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { MediaType } from '../constant/media-type.enum';

export class FindShowDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(75)
  name?: string;

  @IsOptional()
  @IsEnum(MediaType)
  mediaType?: MediaType;
}
