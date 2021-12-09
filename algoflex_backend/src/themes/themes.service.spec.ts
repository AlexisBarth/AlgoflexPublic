import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Theme } from './entities';
import { ThemesService } from './themes.service';

describe('ThemesService', () => {
  let service: ThemesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ThemesService,
        {
          provide: getRepositoryToken(Theme),
          useValue: 'themeRepository',
        },
      ],
    }).compile();

    service = module.get<ThemesService>(ThemesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
