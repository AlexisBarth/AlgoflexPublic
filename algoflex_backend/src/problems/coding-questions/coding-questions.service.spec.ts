import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CodingQuestionsService } from './coding-questions.service';
import { CodingQuestion } from './entities/coding-question.entity';

describe('CodingQuestionsService', () => {
  let service: CodingQuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CodingQuestionsService,
        {
          provide: getRepositoryToken(CodingQuestion),
          useValue: 'codingQuestionRepository',
        },
      ],
    }).compile();

    service = module.get<CodingQuestionsService>(CodingQuestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
