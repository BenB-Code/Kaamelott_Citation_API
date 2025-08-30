import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { MediaType } from '../constant/media-type.enum';

export class ShowDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(75)
  name: string;

  @IsNotEmpty()
  @IsEnum(MediaType)
  mediaType: MediaType;
}
