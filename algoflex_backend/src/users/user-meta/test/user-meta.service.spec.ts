import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CodingQuestion } from 'src/problems/coding-questions/entities/coding-question.entity';
import { codingQuestionRepositoryStub } from 'src/problems/coding-questions/test/stub/coding-question.repository.stub';
import { createCodingQuestionDtoStub } from 'src/problems/coding-questions/test/stub/create-coding-question.stub';
import { CreateUserMetaDto } from '../dto/create-user-meta.dto';
import { UserMeta } from '../entities/user-meta.entity';
import { UserMetaService } from '../user-meta.service';
import { createUserMetaDtoStub } from './stubs/create-user-meta.stub';
import { userMetaRepositoryStub } from './stubs/user-meta.repository.stub';

describe('UserMetaService', () => {
  let service: UserMetaService;
  let userMetaRepository = userMetaRepositoryStub();
  let codingQuestionRepository = codingQuestionRepositoryStub();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserMetaService,
        {
          provide: getRepositoryToken(UserMeta),
          useValue: userMetaRepository,
        },
        {
          provide: getRepositoryToken(CodingQuestion),
          useValue: codingQuestionRepository,
        },
      ],
    }).compile();

    service = module.get<UserMetaService>(UserMetaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all userMetas', async () => {
    let userMetas: UserMeta[];
    let userMetaCreate: UserMeta;
    let userMetadto = createUserMetaDtoStub();
    let codingQuestionCreate: CodingQuestion;
    let codingQuestionDto = createCodingQuestionDtoStub();

    // Check if find All is empty at first as it should be
    userMetaRepository.clear();
    codingQuestionRepository.clear();
    userMetas = await service.findAll('1');
    expect(userMetas).toBeFalsy();

    // Create coding question
    codingQuestionCreate = codingQuestionRepository.save(codingQuestionDto);
    userMetadto.questionId = codingQuestionCreate.uid;

    // Create user Meta
    userMetaCreate = await service.create('1', userMetadto);
    expect(userMetaCreate).toEqual({
      uid: expect.any(String),
      userId: '1',
      ...userMetadto
    })

    // Check find All
    userMetas = await service.findAll('1');
    expect(userMetas).toBeTruthy();
    expect(userMetaRepository.find).toHaveBeenCalledWith({userId: '1'})
  })

  it('should create a userMeta then find a userMeta', async () => {
    let userMetaCreate: UserMeta;
    let userMetadto = createUserMetaDtoStub();
    let userMetaFind: UserMeta;
    let codingQuestionCreate: CodingQuestion;
    let codingQuestionDto = createCodingQuestionDtoStub();

    userMetaRepository.clear();
    codingQuestionRepository.clear();

    // Create coding question
    codingQuestionCreate = codingQuestionRepository.save(codingQuestionDto);
    userMetadto.questionId = codingQuestionCreate.uid;

    // Create user Meta
    userMetaCreate = await service.create('1', userMetadto);
    expect(userMetaCreate).toEqual({
      uid: expect.any(String),
      userId: '1',
      ...userMetadto
    })
    expect(userMetaRepository.save).toHaveBeenCalled();

    // Check find One
    userMetaFind = await service.findOne('1', userMetaCreate.questionId);
    expect(userMetaFind.uid).toEqual(userMetaCreate.uid)
    expect(userMetaRepository.findOne).toHaveBeenCalledWith({userId: '1', questionId: userMetaCreate.questionId});
  })

  
  it('should create then delete a userMeta', async () => {
    let userMetaCreate: UserMeta;
    let userMetadto:CreateUserMetaDto = {
      userCode: 'userCodeToDelete',
      questionId: 'questionIdToDelete',
    }
    let codingQuestionCreate: CodingQuestion;
    let codingQuestionDto = createCodingQuestionDtoStub();

    userMetaRepository.clear();
    codingQuestionRepository.clear();
    // Create coding question
    codingQuestionCreate = codingQuestionRepository.save(codingQuestionDto);
    userMetadto.questionId = codingQuestionCreate.uid;

    // Create user Meta
    userMetaCreate = await service.create('1', userMetadto)
    expect(userMetaCreate).toEqual({
      uid: expect.any(String),
      userId: '1',
      ...userMetadto
    })

    // Check remove
    await service.remove(userMetaCreate.uid)
    expect(userMetaRepository.findOne).toHaveBeenCalledWith(userMetaCreate.uid);
    expect(userMetaRepository.remove).toHaveBeenCalled()
    expect(await userMetaRepository.findOne(userMetaCreate.uid)).toBeUndefined();
  })

});
