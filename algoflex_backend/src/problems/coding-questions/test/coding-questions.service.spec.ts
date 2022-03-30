import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CodingQuestionsService } from '../coding-questions.service';
import { CodingQuestion } from '../entities/coding-question.entity';
import { codingQuestionStub } from './stub/coding-question.stub';

describe('CodingQuestionsService', () => {
  let service: CodingQuestionsService;
  let codingQuestionList : CodingQuestion[] = [];

  const mockCodingQuestionRepository = {
    find: jest.fn().mockImplementation(() => codingQuestionList),
    findOne: jest.fn().mockImplementation((uid:string) => {
      let codingQuestion : CodingQuestion | undefined;
      codingQuestion = codingQuestionList.find(e => e.uid === uid);
      return codingQuestion
    }),
    save: jest.fn().mockImplementation(dto => {
      if (codingQuestionList.find(e => e.uid === dto.uid))
        return dto;
      let uid: String;
      uid = Date.now().toString();
      dto.uid = uid;
      codingQuestionList.push(dto);
      return dto;
    }),
    preload: jest.fn().mockImplementation((dto) => {
      let id : String = dto.uid;
      let codingQuestion : CodingQuestion | undefined;
      codingQuestion = codingQuestionList.find(e => e.uid === id);
      
      if (!codingQuestion) return undefined
      codingQuestionList.filter(i => i !== codingQuestion);

      dto.uid = id;
      codingQuestionList.push(dto);
      return dto;
    }),
    remove: jest.fn().mockImplementation(dto => {
      codingQuestionList = codingQuestionList.filter(i => i !== dto);
      return dto;
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CodingQuestionsService,
        {
          provide: getRepositoryToken(CodingQuestion),
          useValue: mockCodingQuestionRepository,
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
    expect(mockCodingQuestionRepository.find).toHaveBeenCalled();
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

    expect(mockCodingQuestionRepository.save).toHaveBeenCalledWith({uid: codingQuestionCreate.uid, ...dto});

    let codingQuestionFind = await service.findOne(codingQuestionCreate.uid);
    expect(codingQuestionFind.uid).toEqual(codingQuestionCreate.uid)
    expect(mockCodingQuestionRepository.findOne).toHaveBeenCalledWith(codingQuestionCreate.uid);

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

    expect(mockCodingQuestionRepository.save).toHaveBeenCalled();
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
    expect(mockCodingQuestionRepository.findOne).toHaveBeenCalledWith(codingQuestionCreate.uid);
    expect(mockCodingQuestionRepository.remove).toHaveBeenCalled()
    expect(await mockCodingQuestionRepository.findOne(codingQuestionCreate.uid)).toBeUndefined();
  })

});
