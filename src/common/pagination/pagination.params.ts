import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationParams {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  limit: number = 100;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  offset: number = 0;
}
