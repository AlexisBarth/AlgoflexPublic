import { Test, TestingModule } from '@nestjs/testing';
import { baseRequestStub } from 'src/users/test/stubs/base-request.stub';
import { Submission } from '../entities/submission.entity';
import { SubmissionsController } from '../submissions.controller';
import { SubmissionsService } from '../submissions.service';
import { createSubmissionDtoStub } from './stubs/create-submission.stub';
import { submissionStub } from './stubs/submission.stub';

// Ceci va appeler le mock service au lieu du vrai Service
jest.mock('./../submissions.service');

describe('SubmissionsController', () => {
  let controller: SubmissionsController;
  let service: SubmissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubmissionsController],
      providers: [SubmissionsService],
    }).compile();

    controller = module.get<SubmissionsController>(SubmissionsController);
    service = module.get<SubmissionsService>(SubmissionsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
  describe('findOne', () => {
    describe('when findOne is called', () => {
      let submission: Submission;

      beforeEach(async () => {
        submission = await controller.findOne(submissionStub().uid, baseRequestStub());
      })
      
      test('then it should call submissionsService', () => {
        expect(service.findOne).toBeCalledWith(submissionStub().uid, baseRequestStub()!.user!.uid);
      })

      test('then it should return a submission', () => {
        expect(submission).toEqual(submissionStub());
      })

    })
  })

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let submission: Submission[];

      beforeEach(async () => {
        submission = await controller.findAll(baseRequestStub());
      })
      
      test('then it should call submissionsService', () => {
        expect(service.findAll).toBeCalledWith(baseRequestStub()!.user!.uid);
      })

      test('then it should return submissions', () => {
        expect(submission).toEqual([submissionStub()]);
      })

    })
  })

  describe('create', () => {
    describe('when create is called', () => {
      let submission: Submission;

      beforeEach(async () => {
        submission = await controller.create(baseRequestStub(), createSubmissionDtoStub());
      })
      
      test('then it should call submissionsService', () => {
        expect(service.create).toBeCalledWith(baseRequestStub()!.user!.uid, createSubmissionDtoStub());
      })

      test('then it should return a submission', () => {
        expect(submission).toEqual(submissionStub());
      })

    })
  })

  describe('update', () => {
    describe('when update is called', () => {
      let submission: Submission;

      beforeEach(async () => {
        submission = await controller.update(baseRequestStub(), submissionStub().uid, createSubmissionDtoStub());
      })
      
      test('then it should call submissionsService', () => {
        expect(service.update).toBeCalledWith(submissionStub().uid, baseRequestStub()!.user!.uid, createSubmissionDtoStub());
      })

      test('then it should return a submission', () => {
        expect(submission).toEqual(submissionStub());
      })

    })
  })

  describe('remove', () => {
    describe('when remove is called', () => {
      let submission: Submission;

      beforeEach(async () => {
        submission = await controller.remove(submissionStub().uid);
      })
      
      test('then it should call submissionsService', () => {
        expect(service.remove).toBeCalledWith(submissionStub().uid);
      })

      test('then it should return a submission', () => {
        expect(submission).toEqual(submissionStub());
      })

    })
  })
});
