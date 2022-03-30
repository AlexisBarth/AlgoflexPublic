import { Test, TestingModule } from '@nestjs/testing';
import { baseRequestStub } from 'src/problems/themes/test/stubs/base-request.stub';
import { Submission } from '../entities/submission.entity';
import { SubmissionsController } from '../submissions.controller';
import { SubmissionsService } from '../submissions.service';
import { submissionStub } from './stubs/submission.stub';

jest.mock('./../submissions.service');

describe('SubmissionsController', () => {
  let controller: SubmissionsController;
  let service: SubmissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubmissionsController],
      providers: [ SubmissionsService ],
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
      
      test('then it should call call submissionsService', () => {
        expect(service.findOne).toBeCalledWith(submissionStub().uid, baseRequestStub()!.user!.uid);
      })

      test('then it should return a submission', () => {
        expect(submission).toEqual(submissionStub());
      })

    })
  })
});
