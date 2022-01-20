import { Test, TestingModule } from '@nestjs/testing';
import { CompilerGateway } from './compiler.gateway';

describe('CompilerGateway', () => {
  let gateway: CompilerGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompilerGateway],
    }).compile();

    gateway = module.get<CompilerGateway>(CompilerGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
