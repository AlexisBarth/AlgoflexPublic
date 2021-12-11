import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Theme } from './entities';
import { ThemesController } from './themes.controller';
import { ThemesService } from './themes.service';

describe('ThemesController', () => {
  let controller: ThemesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThemesController],
      providers: [
        ThemesService,
        {
          provide: getRepositoryToken(Theme),
          useValue: 'themeRepository',
        },
      ],
    }).compile();

    controller = module.get<ThemesController>(ThemesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
