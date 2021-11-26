import { Test, TestingModule } from '@nestjs/testing';
import { DockerServerService } from './docker-server.service';

describe('DockerServerService', () => {
  let service: DockerServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DockerServerService],
    }).compile();

    service = module.get<DockerServerService>(DockerServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
