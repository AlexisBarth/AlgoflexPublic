import { Test, TestingModule } from '@nestjs/testing';
import { DockerServerGateway } from './docker-server.gateway';
import { DockerServerService } from './docker-server.service';

describe('DockerServerGateway', () => {
  let gateway: DockerServerGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DockerServerGateway, DockerServerService],
    }).compile();

    gateway = module.get<DockerServerGateway>(DockerServerGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
