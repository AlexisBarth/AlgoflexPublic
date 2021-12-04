import { Injectable } from '@nestjs/common';
import { CreateCodingQuestionDto } from './dto/create-coding-question.dto';
import { UpdateCodingQuestionDto } from './dto/update-coding-question.dto';

@Injectable()
export class CodingQuestionsService {
  create(createCodingQuestionDto: CreateCodingQuestionDto) {
    return 'This action adds a new codingQuestion';
  }

  findAll() {
    return `This action returns all codingQuestions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} codingQuestion`;
  }

  update(id: number, updateCodingQuestionDto: UpdateCodingQuestionDto) {
    return `This action updates a #${id} codingQuestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} codingQuestion`;
  }
}
