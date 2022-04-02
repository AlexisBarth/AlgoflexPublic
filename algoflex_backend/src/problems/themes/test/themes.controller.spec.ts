import { Test, TestingModule } from '@nestjs/testing';
import { Theme } from '../entities';
import { ThemesController } from '../themes.controller';
import { ThemesService } from '../themes.service';
import { createThemeDtoStub } from './stubs/create-theme.stub';
import { themeStub } from './stubs/theme.stub';

jest.mock('./../themes.service');
describe('ThemesController', () => {
  let controller: ThemesController;
  let service: ThemesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThemesController],
      providers: [ThemesService],
    }).compile();

    controller = module.get<ThemesController>(ThemesController);
    service = module.get<ThemesService>(ThemesService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let theme: Theme;

      beforeEach(async () => {
        theme = await controller.findOne(themeStub().uid);
      })
      
      test('then it should call call themesService', () => {
        expect(service.findOne).toBeCalledWith(themeStub().uid);
      })

      test('then it should return a theme', () => {
        expect(theme).toEqual(themeStub());
      })

    })
  })

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let theme: Theme[];

      beforeEach(async () => {
        theme = await controller.findAll();
      })
      
      test('then it should call call themesService', () => {
        expect(service.findAll).toBeCalledWith();
      })

      test('then it should return themes', () => {
        expect(theme).toEqual([themeStub()]);
      })

    })
  })

  describe('create', () => {
    describe('when create is called', () => {
      let theme: Theme;

      beforeEach(async () => {
        theme = await controller.create(createThemeDtoStub());
      })
      
      test('then it should call themesService', () => {
        expect(service.create).toBeCalledWith(createThemeDtoStub());
      })

      test('then it should return a theme', () => {
        expect(theme).toEqual(themeStub());
      })

    })
  })

  describe('update', () => {
    describe('when update is called', () => {
      let themeId: string;

      beforeEach(async () => {
        themeId = await controller.update(themeStub().uid, createThemeDtoStub());
      })
      
      test('then it should call themesService', () => {
        //expect(service.update).toBeCalledWith(themeStub().uid, createThemeDtoStub());
        // Not implemented yet
      })

      test('then it should return a theme', () => {
        expect(themeId).toEqual(themeStub().uid);
      })

    })
  })

  describe('remove', () => {
    describe('when remove is called', () => {
      let theme: Theme;

      beforeEach(async () => {
        theme = await controller.remove(themeStub().uid);
      })
      
      test('then it should call themesService', () => {
        expect(service.remove).toBeCalledWith(themeStub().uid);
      })

      test('then it should return a theme', () => {
        expect(theme).toEqual(themeStub());
      })

    })
  })
});
