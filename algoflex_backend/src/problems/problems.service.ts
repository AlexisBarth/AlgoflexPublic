import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { Problem } from './entities/problem.entity';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(Problem)
    private readonly problemRepository: Repository<Problem>
  ) {}

  async findAll(): Promise<Problem[]> {
    return this.problemRepository.find();
  }

  async findOne(id: number): Promise<Problem> {
    const problem = await this.problemRepository.findOne(id);
    if (!problem) {
      throw new NotFoundException(`Problem ${id} not found`);
    }
    return problem;
  }

  async create(createProblemDto: CreateProblemDto): Promise<Problem> {
    return this.problemRepository.save(createProblemDto);
  }

  async update(id: number, updateProblemDto: UpdateProblemDto) {
    return `This action updates a #${id} problem`;
  }

  async remove(id: number): Promise<Problem> {
    const problem = await this.problemRepository.findOne(id);
    return this.problemRepository.remove(problem);
  }
}
