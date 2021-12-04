import { Module } from '@nestjs/common';
import { CodingQuestionsService } from './coding-questions.service';
import { CodingQuestionsController } from './coding-questions.controller';

@Module({
  controllers: [CodingQuestionsController],
  providers: [CodingQuestionsService]
})
export class CodingQuestionsModule {}
