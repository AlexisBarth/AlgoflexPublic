import { PartialType } from '@nestjs/mapped-types';
import { CreateDockerServerDto } from './create-docker-server.dto';

export class UpdateDockerServerDto extends PartialType(CreateDockerServerDto) {
  id: number;
}
