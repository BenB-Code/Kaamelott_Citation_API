import { IsNotEmpty, IsString } from 'class-validator';

export class FindByIdParams {
  @IsString()
  @IsNotEmpty()
  id: string;
}
