import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateThemeDto } from '../dto/create-theme.dto';
import { Theme } from '../entities';
import { ThemesService } from '../themes.service';
import { createThemeDtoStub } from './stubs/create-theme.stub';
import { themeRepositoryStub } from './stubs/theme.repository.stub';

describe('ThemesService', () => {
  let service: ThemesService;
  let repository = themeRepositoryStub();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ThemesService,
        {
          provide: getRepositoryToken(Theme),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<ThemesService>(ThemesService);
  });

  it('should be defined', () => {
    expect(service.create).toBeDefined();
  });

  it('should find all themes', async () => {
    let themes: Theme[];

    repository.clear();
    themes = await service.findAll();
    expect(themes).toBeTruthy();
    expect(repository.find).toHaveBeenCalled();
  })

  it('should create a new themes then finds it by id', async () => {
    let themeCreate: Theme;
    let dto = createThemeDtoStub();
    let themeFind: Theme;

    repository.clear();
    themeCreate = await service.create(dto)
    expect(themeCreate).toEqual({
      uid: expect.any(String),
      ...dto
    })
    expect(repository.save).toHaveBeenCalledWith({uid: themeCreate.uid, ...dto});

    themeFind = await service.findOne(themeCreate.uid);
    expect(themeFind.uid).toEqual(themeCreate.uid)
    expect(repository.findOne).toHaveBeenCalledWith(themeCreate.uid);
  })


  // Not Implemented
  it.skip('should update a themes after it was created', async () => {
    let themeCreate: Theme;
    let dto:CreateThemeDto = {
      name: 'oldName',
      description: 'oldDescription',
      imageUrl: 'oldImageUrl',
    }
  
    repository.clear();
    themeCreate = await service.create(dto)
    expect(themeCreate).toEqual({
      uid: expect.any(String),
      ...dto
    })

    let dtoUpdated = {
      name: 'newName',
      description: 'newDescription',
      imageUrl: 'newImageUrl',
    }

    expect(await service.update(Number(themeCreate.uid), dtoUpdated)).toEqual({
        uid: themeCreate.uid,
        ...dtoUpdated
    })

    expect(repository.save).toHaveBeenCalled();
  })

  it('should create then delete a themes', async () => {
    let themeCreate: Theme;
    let dto:CreateThemeDto = {
      name: 'nameToDelete',
      description: 'descriptionToDelete',
      imageUrl: 'imageUrlToDelete',
    }

    repository.clear();
    themeCreate = await service.create(dto)
    expect(themeCreate).toEqual({
      uid: expect.any(String),
      ...dto
    })

    await service.remove(themeCreate.uid)
    expect(repository.findOne).toHaveBeenCalledWith(themeCreate.uid);
    expect(repository.remove).toHaveBeenCalled()
    expect(await repository.findOne(themeCreate.uid)).toBeUndefined();
  })

});
