import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLimitDto } from './dto/create-limit.dto';
import { UpdateLimitDto } from './dto/update-limit.dto';
import { Limit } from './entities/limit.entity';

@Injectable()
export class LimitsService {
  constructor(
    @InjectRepository(Limit)
    private readonly limitRepository: Repository<Limit>
  ) {}

  async findAll(): Promise<Limit[]> {
    return this.limitRepository.find();
  }

  async findOne(id: number): Promise<Limit> {
    const limit = await this.limitRepository.findOne(id);
    if (!limit) {
      throw new NotFoundException(`Limit ${id} not found`);
    }
    return limit;
  }

  async create(createLimitDto: CreateLimitDto): Promise<Limit> {
    return this.limitRepository.save(createLimitDto);
  }

  async update(id: number, updateLimitDto: UpdateLimitDto): Promise<string> {
    return this.limitRepository.update(UpdateLimitDto);
  }

  async remove(id: number): Promise<Limit> {
    const limit = await this.limitRepository.findOne(id);
    return this.limitRepository.remove(limit);
  }
}
