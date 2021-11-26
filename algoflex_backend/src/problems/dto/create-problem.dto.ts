import { IsNumber, IsString } from 'class-validator';

export class CreateProblemDto {
  @IsString()
  readonly description: string;

  @IsNumber()
  readonly themeId: number;
}
