import { Test, TestingModule } from '@nestjs/testing';
import { baseRequestStub } from 'src/users/test/stubs/base-request.stub';
import { UserMeta } from '../entities/user-meta.entity';
import { UserMetaController } from '../user-meta.controller';
import { UserMetaService } from '../user-meta.service';
import { createUserMetaDtoStub } from './stubs/create-user-meta.stub';
import { userMetaStub } from './stubs/user-meta.stub';

jest.mock('./../user-meta.service');
describe('UserMetaController', () => {
  let controller: UserMetaController;
  let service: UserMetaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMetaController],
      providers: [UserMetaService],
    }).compile();

    controller = module.get<UserMetaController>(UserMetaController);
    service = module.get<UserMetaService>(UserMetaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let userMeta: UserMeta;

      beforeEach(async () => {
        userMeta = await controller.findOne(baseRequestStub(), userMetaStub().uid, userMetaStub().questionId);
      })
      
      test('then it should call call userMetasService', () => {
        expect(service.findOne).toBeCalledWith(userMetaStub().uid, userMetaStub().questionId);
      })

      test('then it should return a userMeta', () => {
        expect(userMeta).toEqual(userMetaStub());
      })

    })
  })

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let userMetas: UserMeta[];

      beforeEach(async () => {
        userMetas = await controller.findAll(baseRequestStub(), userMetaStub().uid);
      })
      
      test('then it should call call userMetasService', () => {
        expect(service.findAll).toBeCalledWith(userMetaStub().uid);
      })

      test('then it should return userMetas', () => {
        expect(userMetas).toEqual([userMetaStub()]);
      })

    })
  })

  describe('create', () => {
    describe('when create is called', () => {
      let userMeta: UserMeta;

      beforeEach(async () => {
        userMeta = await controller.create(baseRequestStub(), userMetaStub().uid, createUserMetaDtoStub());
      })
      
      test('then it should call userMetasService', () => {
        expect(service.create).toBeCalledWith(userMetaStub().uid, createUserMetaDtoStub());
      })

      test('then it should return a userMeta', () => {
        expect(userMeta).toEqual(userMetaStub());
      })

    })
  })

  describe('remove', () => {
    describe('when remove is called', () => {
      let userMeta: UserMeta | undefined;

      beforeEach(async () => {
        userMeta = await controller.remove(baseRequestStub(), userMetaStub().uid, userMetaStub().questionId);
      })
      
      test('then it should call userMetasService', () => {
        expect(service.remove).toBeCalledWith(userMetaStub().uid);
      })

      test('then it should return a userMeta', () => {
        expect(userMeta).toEqual(userMetaStub());
      })

    })
  })

});
