import { Injectable } from '@nestjs/common';
import { CreateDockerServerDto } from './dto/create-docker-server.dto';
import { UpdateDockerServerDto } from './dto/update-docker-server.dto';

@Injectable()
export class DockerServerService {
  create(createDockerServerDto: CreateDockerServerDto) {
    return 'This action adds a new dockerServer';
  }

  findAll() {
    return `This action returns all dockerServer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dockerServer`;
  }

  update(id: number, updateDockerServerDto: UpdateDockerServerDto) {
    return `This action updates a #${id} dockerServer`;
  }

  remove(id: number) {
    return `This action removes a #${id} dockerServer`;
  }
}
