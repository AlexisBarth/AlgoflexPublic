import { Module } from '@nestjs/common';
import { DockerServerService } from './docker-server.service';
import { DockerServerGateway } from './docker-server.gateway';

@Module({
  providers: [
    // DockerServerGateway,
    // DockerServerService,
  ],
})
export class DockerServerModule {}
