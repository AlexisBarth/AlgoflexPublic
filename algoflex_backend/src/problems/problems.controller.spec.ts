import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Problem } from './entities/problem.entity';
import { ProblemsController } from './problems.controller';
import { ProblemsService } from './problems.service';

describe('ProblemsController', () => {
  let controller: ProblemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProblemsController],
      providers: [
        ProblemsService,
        {
          provide: getRepositoryToken(Problem),
          useValue: 'problemRepository',
        },
      ],
    }).compile();

    controller = module.get<ProblemsController>(ProblemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
