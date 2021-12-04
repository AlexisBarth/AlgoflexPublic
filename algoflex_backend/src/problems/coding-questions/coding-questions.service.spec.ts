import { Test, TestingModule } from '@nestjs/testing';
import { CodingQuestionsService } from './coding-questions.service';

describe('CodingQuestionsService', () => {
  let service: CodingQuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodingQuestionsService],
    }).compile();

    service = module.get<CodingQuestionsService>(CodingQuestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
