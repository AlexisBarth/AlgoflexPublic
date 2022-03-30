import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Submission } from '../entities/submission.entity';
import { SubmissionsService } from '../submissions.service';

describe('SubmissionsService', () => {
  let service: SubmissionsService;
  
  const mockSubmissionRepository = {
    find: jest.fn().mockImplementation(() => {}),
    findOne: jest.fn().mockImplementation((uid:string, userId:string) => {
      return {uid: uid, userId:userId}
    }),
    save: jest.fn().mockImplementation(dto => {return {uid: Date.now(), ...dto}}),
    preload: jest.fn().mockImplementation(dto => {return {userId: '1', ...dto}}),
    remove: jest.fn().mockImplementation(dto => {return dto})
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubmissionsService,
        {
          provide: getRepositoryToken(Submission),
          useValue: mockSubmissionRepository,
        },
      ],
    }).compile();

    service = module.get<SubmissionsService>(SubmissionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all submissions', async () => {
    service.findAll('1')

    expect(mockSubmissionRepository.find).toHaveBeenCalledWith({userId: '1'});
  })

  it('should find a submission', async () => {
    expect(service.findOne('1', '1')).toEqual(
      Promise.resolve({
        uid: '1', 
        userId: '1'
      }
    ))
    expect(mockSubmissionRepository.findOne).toHaveBeenCalledWith({uid: '1', userId: '1'});
  })

  it('should create a new submission', async () => {
    let dto = {
      language:'string',
      questionId:'string',
      solution:'string'
    }
    expect(await service.create('1', dto)).toEqual({
        uid: expect.any(Number),
        userId: '1',
        status: "CORRECT",
        ...dto
      }
    )

    expect(mockSubmissionRepository.save).toHaveBeenCalledWith({userId: '1', status: "CORRECT", ...dto});
  })

  it('should update a submission', async () => {
    let dto = {
      language:'string',
      questionId:'string',
      solution:'string',
      status: 'CORRECT',
    }
    expect(await service.update('1', '1', dto)).toEqual({
        uid: '1',
        userId: '1',
        ...dto
      }
    )

    expect(mockSubmissionRepository.save).toHaveBeenCalled();
  })

  it('should delete a submission', async () => {
    service.remove('1')

    expect(await mockSubmissionRepository.findOne).toHaveBeenCalledWith('1');
    expect(mockSubmissionRepository.remove).toHaveBeenCalled()
  })

});
