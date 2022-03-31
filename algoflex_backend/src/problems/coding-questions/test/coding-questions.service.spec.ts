import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CodingQuestionsService } from '../coding-questions.service';
import { CodingQuestion } from '../entities/coding-question.entity';
import { codingQuestionStub } from './stub/coding-question.stub';
import { codingQuestionRepositoryStub } from './stub/coding-question.repository.stub';

describe('CodingQuestionsService', () => {
  let service: CodingQuestionsService;
  let repository = codingQuestionRepositoryStub();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CodingQuestionsService,
        {
          provide: getRepositoryToken(CodingQuestion),
          useValue: codingQuestionRepositoryStub(),
        },
      ],
    }).compile();

    service = module.get<CodingQuestionsService>(CodingQuestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all codingQuestions', async () => {
    let codingQuestions: CodingQuestion[];
    
    codingQuestions = await service.findAll();
    expect(codingQuestions).toBeTruthy()
    expect(repository.find).toHaveBeenCalled();
  })

  it('should create a new codingQuestions then finds it', async () => {
    let codingQuestionCreate: CodingQuestion;
    
    let dto = {
      name: codingQuestionStub().name,
      description: codingQuestionStub().description,
      theme: codingQuestionStub().theme,
      prompt: codingQuestionStub().prompt,
    }

    codingQuestionCreate = await service.create(dto)
    expect(codingQuestionCreate).toEqual({
      uid: expect.any(String),
      ...dto
    })

    expect(repository.save).toHaveBeenCalledWith({uid: codingQuestionCreate.uid, ...dto});

    let codingQuestionFind = await service.findOne(codingQuestionCreate.uid);
    expect(codingQuestionFind.uid).toEqual(codingQuestionCreate.uid)
    expect(repository.findOne).toHaveBeenCalledWith(codingQuestionCreate.uid);

  })

  it('should update a codingQuestions after it was created', async () => {
    let codingQuestionCreate: CodingQuestion;
    
    let dto = {
      name: 'oldName',
      description: 'oldDescription',
      theme: 'oldTheme',
      prompt: 'oldPrompt',
    }
    codingQuestionCreate = await service.create(dto)
    expect(codingQuestionCreate).toEqual({
      uid: expect.any(String),
      ...dto
    })

    let dtoUpdated = {
      name: 'newName',
      description: 'newDescription',
      theme: 'newTheme',
      prompt: 'newPrompt',
    }

    expect(await service.update(codingQuestionCreate.uid, dtoUpdated)).toEqual({
        uid: codingQuestionCreate.uid,
        ...dtoUpdated
      }
    )

    expect(repository.save).toHaveBeenCalled();
  })

  it('should create then delete a codingQuestions', async () => {
    let codingQuestionCreate: CodingQuestion;
    
    let dto = {
      name: 'nameToDelete',
      description: 'descriptionToDelete',
      theme: 'themeToDelete',
      prompt: 'promptToDelete',
    }
    codingQuestionCreate = await service.create(dto)
    expect(codingQuestionCreate).toEqual({
      uid: expect.any(String),
      ...dto
    })

    await service.remove(codingQuestionCreate.uid)
    expect(repository.findOne).toHaveBeenCalledWith(codingQuestionCreate.uid);
    expect(repository.remove).toHaveBeenCalled()
    expect(await repository.findOne(codingQuestionCreate.uid)).toBeUndefined();
  })

});
