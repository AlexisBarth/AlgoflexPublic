import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CodingQuestionsController } from './coding-questions.controller';
import { CodingQuestionsService } from './coding-questions.service';
import { CodingQuestion } from './entities/coding-question.entity';

describe('CodingQuestionsController', () => {
  let controller: CodingQuestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodingQuestionsController],
      providers: [
        CodingQuestionsService,
        {
          provide: getRepositoryToken(CodingQuestion),
          useValue: 'codingQuestionRepository',
        },
      ],
    }).compile();

    controller = module.get<CodingQuestionsController>(CodingQuestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
