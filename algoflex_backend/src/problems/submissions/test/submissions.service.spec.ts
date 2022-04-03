import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateSubmissionDto } from '../dto/create-submission.dto';
import { Submission } from '../entities/submission.entity';
import { SubmissionsService } from '../submissions.service';
import { createSubmissionDtoStub } from './stubs/create-submission.stub';
import { submissionRepositoryStub } from './stubs/submission.repository.stub';

describe('SubmissionsService', () => {
  let service: SubmissionsService;
  let repository = submissionRepositoryStub();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubmissionsService,
        {
          provide: getRepositoryToken(Submission),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<SubmissionsService>(SubmissionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a submission then find all submissions', async () => {
    let submissions: Submission[];
    let submissionCreate: Submission;
    let dto = createSubmissionDtoStub();

    repository.clear();
    submissions = await service.findAll('1');
    expect(submissions).toBeFalsy();

    submissionCreate = await service.create('1', dto);
    expect(submissionCreate).toEqual({
      uid: expect.any(String),
      userId: '1',
      ...dto
    })
    submissions = await service.findAll('1');
    expect(submissions).toBeTruthy();
    expect(repository.find).toHaveBeenCalledWith({userId: '1'});
  })

  it('should create a submission then find a submission', async () => {
    let submissionCreate: Submission;
    let dto = createSubmissionDtoStub();
    let submissionFind: Submission;

    repository.clear();
    submissionCreate = await service.create('1', dto)
    expect(submissionCreate).toEqual({
      uid: expect.any(String),
      userId: '1',
      ...dto
    })
    expect(repository.save).toHaveBeenCalledWith({...dto, uid: submissionCreate.uid, userId: '1'});

    submissionFind = await service.findOne(submissionCreate.uid, '1');
    expect(submissionFind.uid).toEqual(submissionCreate.uid)
    expect(repository.findOne).toHaveBeenCalledWith({uid: submissionCreate.uid, userId: '1'});
  })

  it('should create a submission then updates it', async () => {
    let submissionCreate: Submission;
    let dto:CreateSubmissionDto = {
      language: 'oldLanguage',
      questionId: 'oldQuestionId',
      solution: 'oldSolution'
    }
  
    repository.clear();
    submissionCreate = await service.create('1', dto)
    expect(submissionCreate).toEqual({
      uid: expect.any(String),
      userId: '1',
      ...dto
    })

    let dtoUpdated = {
      language: 'newLanguage',
      questionId: 'newQuestionId',
      solution: 'newSolution'
    }
    expect(await service.update(submissionCreate.uid, '1', dtoUpdated)).toEqual({
        uid: submissionCreate.uid,
        userId: '1',
        ...dtoUpdated
    })

    expect(repository.save).toHaveBeenCalled();
  })

  it('should create then delete a submission', async () => {
    let submissionCreate: Submission;
    let dto:CreateSubmissionDto = {
      language: 'languageToDelete',
      questionId: 'questionIdToDelete',
      solution: 'solutionToDelete'
    }

    repository.clear();
    submissionCreate = await service.create('1', dto)
    expect(submissionCreate).toEqual({
      uid: expect.any(String),
      userId: '1',
      ...dto
    })

    await service.remove(submissionCreate.uid)
    expect(repository.findOne).toHaveBeenCalledWith(submissionCreate.uid);
    expect(repository.remove).toHaveBeenCalled()
    expect(await repository.findOne(submissionCreate.uid)).toBeUndefined();
  })

  it('should check exeptions', async () => {
    repository.clear();
    await expect(async () => { 
      await service.findOne('1', '1');
    }).rejects.toThrowError(NotFoundException);

    await expect(async () => { 
      await service.update('1', '1', createSubmissionDtoStub());
    }).rejects.toThrowError(NotFoundException);

    await expect(async () => { 
      await service.remove('1');
    }).rejects.toThrowError(NotFoundException);
  })
});