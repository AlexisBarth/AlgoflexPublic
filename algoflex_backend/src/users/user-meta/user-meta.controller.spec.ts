import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CodingQuestion } from 'src/problems/coding-questions/entities/coding-question.entity';
import { UserMeta } from './entities/user-meta.entity';
import { UserMetaController } from './user-meta.controller';
import { UserMetaService } from './user-meta.service';

describe('UserMetaController', () => {
  let controller: UserMetaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMetaController],
      providers: [
        UserMetaService,
        {
          provide: getRepositoryToken(UserMeta),
          useValue: 'userMetaRepository',
        },
        {
          provide: getRepositoryToken(CodingQuestion),
          useValue: 'codingQuestionRepository',
        },
      ],
    }).compile();

    controller = module.get<UserMetaController>(UserMetaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
