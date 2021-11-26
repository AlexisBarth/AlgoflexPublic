import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { DockerServerService } from './docker-server.service';
import { CreateDockerServerDto } from './dto/create-docker-server.dto';
import { UpdateDockerServerDto } from './dto/update-docker-server.dto';

@WebSocketGateway()
export class DockerServerGateway {
  constructor(private readonly dockerServerService: DockerServerService) {}

  @SubscribeMessage('ws/message')
  onMessage() {
    // return this.dockerServerService.findAll();
  }

  @SubscribeMessage('ws/connection')
  onConnection(@MessageBody() createDockerServerDto: CreateDockerServerDto) {
    // return this.dockerServerService.create(createDockerServerDto);
  }

  @SubscribeMessage('ws/close')
  onClose(@MessageBody() id: number) {
    // return this.dockerServerService.remove(id);
  }
}
