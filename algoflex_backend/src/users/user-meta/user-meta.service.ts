import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodingQuestion } from 'src/problems/coding-questions/entities/coding-question.entity';
import { Repository } from 'typeorm';
import { CreateUserMetaDto } from './dto/create-user-meta.dto';
import { UpdateUserMetaDto } from './dto/update-user-meta.dto';
import { UserMeta } from './entities/user-meta.entity';
import slugify from 'slugify';

@Injectable()
export class UserMetaService {
  constructor(
    @InjectRepository(UserMeta)
    private readonly userMetaRepository: Repository<UserMeta>,
    @InjectRepository(CodingQuestion)
    private readonly codingQuestionRepository: Repository<CodingQuestion>
  ) {}

  async findAll(userId: string): Promise<UserMeta[]> {
    return this.userMetaRepository.find({ userId });
  }

  async findOne(userId: string, questionId: string): Promise<UserMeta> {
    const userMeta = await this.userMetaRepository.findOne({
      userId,
      questionId,
    });
    if (!userMeta) {
      throw new NotFoundException(`UserMeta ${questionId} not found`);
    }
    return userMeta;
  }

  async create(userId: string, createUserMetaDto: CreateUserMetaDto): Promise<UserMeta> {
    const codingQuestionId = slugify(createUserMetaDto.questionId);
    const codingQuestion = await this.codingQuestionRepository.findOne({ uid: codingQuestionId });
    if (!codingQuestion) {
      throw new NotFoundException(`Question with name ${createUserMetaDto.questionId} not found`);
    }
    const userMeta: Partial<UserMeta> = {
      userId,
      userCode: createUserMetaDto.userCode,
      questionId: codingQuestion.uid,
    }
    return this.userMetaRepository.save(userMeta);
  }

  async remove(userMetaId: string): Promise<UserMeta> {
    const userMeta = await this.userMetaRepository.findOne(userMetaId);
    return this.userMetaRepository.remove(userMeta);
  }
}
