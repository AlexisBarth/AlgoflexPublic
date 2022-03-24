import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Theme } from './entities';
import { ThemesService } from './themes.service';

describe('ThemesService', () => {
  let service: ThemesService;

  const mockThemesRepository = {
    find: jest.fn(() => []),
    findOne: jest.fn().mockImplementation(id => {
      return {id: id}
    }),
    save: jest.fn().mockImplementation(theme => Promise.resolve({id: Date.now(), ...theme})),
    update: jest.fn((id, dto) => {
      return {
        id,
        ...dto
      }
    }),
    remove: jest.fn().mockImplementation(dto => {return dto})
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ThemesService,
        {
          provide: getRepositoryToken(Theme),
          useValue: mockThemesRepository,
        },
      ],
    }).compile();

    service = module.get<ThemesService>(ThemesService);
  });

  it('should be defined', () => {
    expect(service.create).toBeDefined();
  });

  it('should find all themes', async () => {
    service.findAll()

    expect(mockThemesRepository.find).toHaveBeenCalled();
  })

  it('should find a theme', async () => {
    expect(service.findOne('1')).toEqual(
      Promise.resolve({
        id: 1
      }
    ))
    expect(mockThemesRepository.findOne).toHaveBeenCalledWith("1");
  })


  it('should create a new theme', async () => {
    let dto = {
      name:"Test Type PUT",
      type:"Test name PUT",
      imageUrl:"Test desc PUT",
      users: [1],
      problems: [1]
    }
    expect(await service.create(dto)).toEqual({
      id: expect.any(Number),
      ...dto
    })

    expect(mockThemesRepository.save).toHaveBeenCalledWith(dto);
  })

  it.skip('should update a theme', async () => {
    let dto = {
      name:"Test Type PUT",
      type:"Test name PUT",
      imageUrl:"Test desc PUT",
      users: [1],
      problems: [1]
    }
    
    expect(service.update(1, dto)).toEqual(
      Promise.resolve({
        id:1,
        ...dto
      }
    ))

    expect(mockThemesRepository.update).toHaveBeenCalledWith(1, dto);
  })

  it('should delete a theme', async () => {
    service.remove('1')

    expect(await mockThemesRepository.findOne).toHaveBeenCalledWith("1");
    expect(mockThemesRepository.remove).toHaveBeenCalled()
  })

});
