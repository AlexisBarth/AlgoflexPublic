import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCodingQuestionDto } from './dto/create-coding-question.dto';
import { UpdateCodingQuestionDto } from './dto/update-coding-question.dto';
import { CodingQuestion } from './entities/coding-question.entity';
import { customSlugify } from 'src/common';

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
      throw new NotFoundException(`Coding question ${id} not found`);
    }
    return codingQuestion;
  }

  async create(createCodingQuestionDto: CreateCodingQuestionDto): Promise<CodingQuestion> {
    const uid = customSlugify(createCodingQuestionDto.name);
    const codingQuestionExists = await this.codingQuestionRepository.findOne(uid);

    if (codingQuestionExists) {
      throw new ConflictException(`Coding question with ${uid} name already exists`);
    }
    const codingQuestion: CodingQuestion = {
      ...createCodingQuestionDto,
      uid,
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
    if (!codingQuestion) {
      throw new NotFoundException(`Coding question #${id} not found`);
    }
    return this.codingQuestionRepository.remove(codingQuestion);
  }
}
