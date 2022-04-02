import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto';
import { User } from '../entity';
import { UsersService } from '../users.service';
import { createUserDtoStub, updateUserDtoStub } from './stubs/create-user.stub';
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
      password: process.env.PASSWORD as string
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

  it('should create then update a user', async () => {
    let userCreate: User;
    let userUpdate: User;
    let createUserDto = createUserDtoStub();
    let updateUserDto = updateUserDtoStub();

    repository.clear();
    userCreate = repository.save(createUserDto);
    expect(userCreate).toEqual({
      uid: expect.any(String),
      firstName: createUserDtoStub().firstName,
      lastName: createUserDtoStub().lastName,
      email: createUserDtoStub().email,
      password: createUserDtoStub().password,
    })
    userUpdate = repository.save(updateUserDto);
    expect(userUpdate).toEqual({
      uid: expect.any(String),
      firstName: updateUserDto.firstName,
      lastName: updateUserDto.lastName,
      email: updateUserDto.email,
      password: updateUserDto.password,
    })

  })

  it('should check exeptions', async () => {
    repository.clear();
    await expect(async () => { 
      await service.findById('1');
    }).rejects.toThrowError(NotFoundException);
    await expect(async () => { 
      await service.remove('1');
    }).rejects.toThrowError(NotFoundException);
  })
});
