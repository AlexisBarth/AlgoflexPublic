import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CodingQuestion } from 'src/problems/coding-questions/entities/coding-question.entity';
import { UserMeta } from '../entities/user-meta.entity';
import { UserMetaService } from '../user-meta.service';

describe('UserMetaService', () => {
  let service: UserMetaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<UserMetaService>(UserMetaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
