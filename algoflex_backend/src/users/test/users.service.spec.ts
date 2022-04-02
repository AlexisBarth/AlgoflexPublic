import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto';
import { User } from '../entity';
import { UsersService } from '../users.service';
import { createUserDtoStub } from './stubs/create-user.stub';
import { userRepositoryStub } from './stubs/user.repository.stub';

describe('UsersService', () => {
  let service: UsersService;
  let repository = userRepositoryStub();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user then it should find all users', async () => {
    let users: User[];

    repository.clear();
    users = await service.findAll();
    expect(users).toBeTruthy();
    expect(repository.find).toHaveBeenCalled();
  })

  it('should create a new user then finds it by id', async () => {
    let userCreate: User;
    let dto = createUserDtoStub();
    let userFind: User;

    repository.clear();
    userCreate = repository.save(dto)
    expect(userCreate).toEqual({
      uid: expect.any(String),
      ...dto
    })
    expect(repository.save).toHaveBeenCalledWith({uid: userCreate.uid, ...dto});

    userFind = await service.findById(userCreate.uid);
    expect(userFind.uid).toEqual(userCreate.uid)
    expect(repository.findOne).toHaveBeenCalledWith(userCreate.uid);
  })

  it('should create then delete a user', async () => {
    let userCreate: User;
    let dto:CreateUserDto = {
      firstName: 'firstNameToDelete',
      lastName: 'lastNameToDelete',
      email: 'emailToDelete',
      password: 'passwordToDelete'
    }

    repository.clear();
    userCreate = repository.save(dto);
    expect(userCreate).toEqual({
      uid: expect.any(String),
      ...dto
    })

    await service.remove(userCreate.uid)
    expect(repository.findOne).toHaveBeenCalledWith(userCreate.uid);
    expect(repository.remove).toHaveBeenCalled()
    expect(await repository.findOne(userCreate.uid)).toBeUndefined();
  })
});
