import { IsString } from 'class-validator';

export class CreateUserMetaDto {
  @IsString()
  questionId: string;

  @IsString()
  userCode: string;
}
