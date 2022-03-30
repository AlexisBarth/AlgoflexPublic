import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../entity';
import { UserController } from '../users.controller'; 
import { UsersService } from '../users.service';
import { baseRequestStub } from './stubs/base-request.stub';
import { userStub } from './stubs/user.stub';

jest.mock('./../users.service');

describe('UserController', () => {
  let controller: UserController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await controller.findOne(userStub().uid);
      })
      
      test('then it should call call usersService', () => {
        expect(service.findById).toBeCalledWith(userStub().uid);
      })

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      })

    })
  })

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let user: User[];

      beforeEach(async () => {
        user = await controller.findAll(baseRequestStub());
      })
      
      test('then it should call call usersService', () => {
        expect(service.findAll).toBeCalledWith();
      })

      test('then it should return a user', () => {
        expect(user).toEqual([userStub()]);
      })

    })
  })

  describe('remove', () => {
    describe('when remove is called', () => {
      let user: User | undefined;

      beforeEach(async () => {
        user = await controller.remove(userStub().uid);
      })
      
      test('then it should call usersService', () => {
        expect(service.remove).toBeCalledWith(userStub().uid);
      })

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      })

    })
  })
});
