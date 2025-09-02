import { IsNumber, IsOptional } from 'class-validator';

export class FindCitationDto {
  @IsOptional()
  @IsNumber()
  id?: number;
}
