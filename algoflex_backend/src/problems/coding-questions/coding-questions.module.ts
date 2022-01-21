import { Module } from '@nestjs/common';
import { CodingQuestionsService } from './coding-questions.service';
import { CodingQuestionsController } from './coding-questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodingQuestion } from './entities/coding-question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CodingQuestion])],
  controllers: [CodingQuestionsController],
  providers: [CodingQuestionsService]
})
export class CodingQuestionsModule {}
