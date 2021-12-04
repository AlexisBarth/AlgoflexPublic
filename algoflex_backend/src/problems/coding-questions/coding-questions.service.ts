import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCodingQuestionDto } from './dto/create-coding-question.dto';
import { UpdateCodingQuestionDto } from './dto/update-coding-question.dto';
import { CodingQuestion } from './entities/coding-question.entity';
import slugify from 'slugify';

@Injectable()
export class CodingQuestionsService {
  constructor(
    @InjectRepository(CodingQuestion)
    private readonly codingQuestionRepository: Repository<CodingQuestion>
  ) {}

  async findAll(): Promise<CodingQuestion[]> {
    return this.codingQuestionRepository.find();
  }

  async findOne(id: string): Promise<CodingQuestion> {
    const codingQuestion = await this.codingQuestionRepository.findOne(id);
    if (!codingQuestion) {
      throw new NotFoundException(`CodingQuestion ${id} not found`);
    }
    return codingQuestion;
  }

  async create(createCodingQuestionDto: CreateCodingQuestionDto): Promise<CodingQuestion> {
    const uid = slugify(createCodingQuestionDto.name);
    const codingQuestion: CodingQuestion = {
      uid,
      ...createCodingQuestionDto,
    }
    return this.codingQuestionRepository.save(codingQuestion);
  }

  async update(id: string, updateCodingQuestionDto: UpdateCodingQuestionDto) {
    const codingQuestion = await this.codingQuestionRepository.preload({
      uid: id,
      ...updateCodingQuestionDto,
    });

    if (!codingQuestion) {
      throw new NotFoundException(`Coding question #${id} not found`);
    }
    return this.codingQuestionRepository.save(codingQuestion);
  }

  async remove(id: string): Promise<CodingQuestion> {
    const codingQuestion = await this.codingQuestionRepository.findOne(id);
    return this.codingQuestionRepository.remove(codingQuestion);
  }
}
