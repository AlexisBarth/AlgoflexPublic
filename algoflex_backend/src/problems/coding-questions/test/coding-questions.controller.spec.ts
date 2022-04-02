import { Test, TestingModule } from '@nestjs/testing';
import { CodingQuestionsController } from '../coding-questions.controller';
import { CodingQuestionsService } from '../coding-questions.service'; 
import { CodingQuestion } from '../entities/coding-question.entity';
import { codingQuestionStub } from './stub/coding-question.stub';
import { createCodingQuestionDtoStub } from './stub/create-coding-question.stub';

jest.mock('./../coding-questions.service');

describe('CodingQuestionsController', () => {
  let controller: CodingQuestionsController;
  let service: CodingQuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodingQuestionsController],
      providers: [CodingQuestionsService],
    }).compile();

    controller = module.get<CodingQuestionsController>(CodingQuestionsController);
    service = module.get<CodingQuestionsService>(CodingQuestionsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let codingQuestion: CodingQuestion;

      beforeEach(async () => {
        codingQuestion = await controller.findOne(codingQuestionStub().uid);
      })
      
      test('then it should call codingQuestionsService', () => {
        expect(service.findOne).toBeCalledWith(codingQuestionStub().uid);
      })

      test('then it should return a codingQuestion', () => {
        expect(codingQuestion).toEqual(codingQuestionStub());
      })

    })
  })

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let codingQuestion: CodingQuestion[];

      beforeEach(async () => {
        codingQuestion = await controller.findAll();
        codingQuestion = await controller.findAll({theme: "theme"});
      })
      
      test('then it should call codingQuestionsService', () => {
        expect(service.findAll).toBeCalledWith();
      })

      test('then it should return codingQuestions', () => {
        expect(codingQuestion).toEqual([codingQuestionStub()]);
      })

    })
  })

  describe('create', () => {
    describe('when create is called', () => {
      let codingQuestion: CodingQuestion;

      beforeEach(async () => {
        codingQuestion = await controller.create(createCodingQuestionDtoStub());
      })
      
      test('then it should call codingQuestionsService', () => {
        expect(service.create).toBeCalledWith(createCodingQuestionDtoStub());
      })

      test('then it should return a codingQuestion', () => {
        expect(codingQuestion).toEqual(codingQuestionStub());
      })

    })
  })

  describe('update', () => {
    describe('when update is called', () => {
      let codingQuestion: CodingQuestion;

      beforeEach(async () => {
        codingQuestion = await controller.update(codingQuestionStub().uid, createCodingQuestionDtoStub());
      })
      
      test('then it should call codingQuestionsService', () => {
        expect(service.update).toBeCalledWith(codingQuestionStub().uid, createCodingQuestionDtoStub());
      })

      test('then it should return a codingQuestion', () => {
        expect(codingQuestion).toEqual(codingQuestionStub());
      })

    })
  })

  describe('remove', () => {
    describe('when remove is called', () => {
      let codingQuestion: CodingQuestion;

      beforeEach(async () => {
        codingQuestion = await controller.remove(codingQuestionStub().uid);
      })
      
      test('then it should call codingQuestionsService', () => {
        expect(service.remove).toBeCalledWith(codingQuestionStub().uid);
      })

      test('then it should return a codingQuestion', () => {
        expect(codingQuestion).toEqual(codingQuestionStub());
      })

    })
  })
});