import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthorDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  picture?: string;
}
