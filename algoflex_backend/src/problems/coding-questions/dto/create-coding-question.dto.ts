import { IsString } from 'class-validator';

export class CreateCodingQuestionDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  theme: string;

  @IsString()
  testCases: string;

  @IsString()
  prompt: string;
}
