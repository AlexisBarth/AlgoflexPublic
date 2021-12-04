import { IsString } from 'class-validator';

export class CreateSubmissionDto {
  @IsString()
  language: string;

  @IsString()
  questionId: string;

  @IsString()
  solution: string;
}
