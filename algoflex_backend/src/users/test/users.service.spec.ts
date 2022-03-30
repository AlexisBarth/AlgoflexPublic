import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entity';
import { UsersService } from '../users.service';

describe('UsersService', () => {
  let service: UsersService;

  const mockUsersRepository = {
    find: jest.fn(() => []),
    findOne: jest.fn().mockImplementation(id => {
      return {id: id}
    }),
    remove: jest.fn().mockImplementation(dto => {return dto})
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all themes', async () => {
    service.findAll()

    expect(mockUsersRepository.find).toHaveBeenCalled();
  })

  it('should find a theme', async () => {
    expect(service.findById('1')).toEqual(
      Promise.resolve({
        id: 1
      }
    ))
    expect(mockUsersRepository.findOne).toHaveBeenCalledWith('1');
  })

  it('should delete a theme', async () => {
    service.remove('1')

    expect(await mockUsersRepository.findOne).toHaveBeenCalledWith('1');
    expect(mockUsersRepository.remove).toHaveBeenCalled()
  })

});
