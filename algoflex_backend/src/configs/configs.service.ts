import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { Config } from './entities/config.entity';

@Injectable()
export class ConfigsService {
  constructor(
    @InjectRepository(Config)
    private readonly configRepository: Repository<Config>
  ) {}

  async findAll(): Promise<Config[]> {
    return this.configRepository.find();
  }

  async findOne(id: number): Promise<Config> {
    const config = await this.configRepository.findOne(id);
    if (!config) {
      throw new NotFoundException(`Config ${id} not found`);
    }
    return config;
  }

  async create(createConfigDto: CreateConfigDto): Promise<Config> {
    return this.configRepository.save(createConfigDto);
  }

  async update(id: number, updateConfigDto: UpdateConfigDto): Promise<string> {
    return this.configRepository.update(UpdateConfigDto);
  }

  async remove(id: number): Promise<Config> {
    const config = await this.configRepository.findOne(id);
    return this.configRepository.remove(config);
  }
}
