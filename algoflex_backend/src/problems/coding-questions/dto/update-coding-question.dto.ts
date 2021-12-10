import { PartialType } from '@nestjs/swagger';
import { CreateCodingQuestionDto } from './create-coding-question.dto';

export class UpdateCodingQuestionDto extends PartialType(CreateCodingQuestionDto) {}
