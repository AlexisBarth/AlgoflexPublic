import { Test, TestingModule } from '@nestjs/testing';
import { BaseRequest } from '../common';
import { UserController } from './users.controller';
import { UsersService } from './users.service';

describe('UserController', () => {
  let controller: UserController;

  const mockUsersService = {
    findAll: jest.fn((_: BaseRequest) => []),
    findById: jest.fn(id => {return {id: id}}),
    update: jest.fn((id, dto) => {
      return {id, ...dto}
    }),
    remove: jest.fn((_:string) => {})
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UsersService],
    }).overrideProvider(UsersService).useValue(mockUsersService).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it.skip('should find all users', () => {
    //controller.findAll(request)
    //TODO define test
    expect(mockUsersService.findAll).toHaveBeenCalled();
  })

  it('should find a user', () => {
    expect(controller.findOne('1')).toEqual({id: '1'})
    expect(mockUsersService.findById).toHaveBeenCalledWith('1');
  })

  it.skip('should update a user', () => {
    controller.update()
  })

  it('should delete a user', () => {
    controller.remove('1')

    expect(mockUsersService.remove).toHaveBeenCalledWith('1');
  })
});
