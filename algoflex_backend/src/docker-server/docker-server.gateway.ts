import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { DockerServerService } from './docker-server.service';
import { CreateDockerServerDto } from './dto/create-docker-server.dto';
import { UpdateDockerServerDto } from './dto/update-docker-server.dto';

@WebSocketGateway()
export class DockerServerGateway {
  constructor(private readonly dockerServerService: DockerServerService) {}

  @SubscribeMessage('createDockerServer')
  create(@MessageBody() createDockerServerDto: CreateDockerServerDto) {
    return this.dockerServerService.create(createDockerServerDto);
  }

  @SubscribeMessage('findAllDockerServer')
  findAll() {
    return this.dockerServerService.findAll();
  }

  @SubscribeMessage('findOneDockerServer')
  findOne(@MessageBody() id: number) {
    return this.dockerServerService.findOne(id);
  }

  @SubscribeMessage('updateDockerServer')
  update(@MessageBody() updateDockerServerDto: UpdateDockerServerDto) {
    return this.dockerServerService.update(updateDockerServerDto.id, updateDockerServerDto);
  }

  @SubscribeMessage('removeDockerServer')
  remove(@MessageBody() id: number) {
    return this.dockerServerService.remove(id);
  }
}
