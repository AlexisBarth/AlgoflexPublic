import { Test, TestingModule } from '@nestjs/testing';
import { CodingQuestionsController } from './coding-questions.controller';
import { CodingQuestionsService } from './coding-questions.service';

describe('CodingQuestionsController', () => {
  let controller: CodingQuestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodingQuestionsController],
      providers: [CodingQuestionsService],
    }).compile();

    controller = module.get<CodingQuestionsController>(CodingQuestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
