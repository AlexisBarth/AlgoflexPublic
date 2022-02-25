import { Module } from '@nestjs/common';
import { BuildGateway } from './compilation/build.gateway';

@Module({
  providers: [BuildGateway],
})
export class BuildModule {}
