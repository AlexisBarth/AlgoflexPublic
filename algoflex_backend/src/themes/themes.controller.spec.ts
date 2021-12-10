import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Theme } from './entities';
import { ThemesController } from './themes.controller';
import { ThemesService } from './themes.service';

describe('ThemesController', () => {
  let controller: ThemesController;
  const mockThemesService = {
    findAll: jest.fn(() => []),
    create: jest.fn(dto => {
      return {
        id: Date.now,
        ...dto
      }
    }),
    findOne: jest.fn(id => {
      return {
        id: id
      }
    }),
    update: jest.fn((id, dto) => {
      return {
        id,
        ...dto
      }
    }),
    remove: jest.fn(id => {})
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThemesController],
      providers: [ThemesService],
    }).overrideProvider(ThemesService).useValue(mockThemesService).compile();

    controller = module.get<ThemesController>(ThemesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should list all themes', () => {
    controller.findAll()

    expect(mockThemesService.findAll).toHaveBeenCalled();
  })

  it('should find a theme', () => {
    expect(controller.findOne('1')).toEqual(
      Promise.resolve({
        id: 1
      }
    ))
    expect(mockThemesService.findOne).toHaveBeenCalledWith(1);
  })

  it('should create a new theme', () => {
    let dto = {
      name:"Test name",
      type:"Test Type",
      imageUrl:"Test desc",
      users: [1],
      problems: [1]
    }
    expect(controller.create(dto)).toEqual(
      Promise.resolve({
        id: expect.any(Number),
        name: dto.name,
        type: dto.type,
        imageUrl: dto.imageUrl,
        users: dto.users,
        problems: dto.problems
      }
    ))

    expect(mockThemesService.create).toHaveBeenCalledWith(dto);
  })

  it('should update a theme', () => {
    let dto = {
      name:"Test Type PUT",
      type:"Test name PUT",
      imageUrl:"Test desc PUT",
      users: [1],
      problems: [1]
    }
    
    expect(controller.update('1', dto)).toEqual(
      Promise.resolve({
        id:'1',
        ...dto
      }
    ))

    expect(mockThemesService.update).toHaveBeenCalledWith(1, dto);
  })

  it('should delete a theme', () => {
    controller.remove('1')

    expect(mockThemesService.remove).toHaveBeenCalledWith(1);
  })
});
