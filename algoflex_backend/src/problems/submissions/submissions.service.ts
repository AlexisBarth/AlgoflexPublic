import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { Submission } from './entities/submission.entity';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>
  ) {}

  async findAll(id: string): Promise<Submission[]> {
    return this.submissionRepository.find({ userId: id });
  }

  async findOne(submissionId: string, userId: string): Promise<Submission> {
    const submission = await this.submissionRepository.findOne({
      uid: submissionId,
      userId: userId,
    });
    if (!submission) {
      throw new NotFoundException(`Submission ${submissionId} not found`);
    }
    return submission;
  }

  async create(id: string, createSubmissionDto: CreateSubmissionDto): Promise<Submission> {
    const submission: Partial<Submission> = {
      ...createSubmissionDto,
      userId: id,
    }
    return this.submissionRepository.save(submission);
  }

  async update(submissionId: string, userId: string, updateSubmissionDto: UpdateSubmissionDto) {
    const submission = await this.submissionRepository.preload({
      uid: submissionId,
      ...updateSubmissionDto,
    });
    console.log(submission);

    if (!submission || submission.userId !== userId) {
      throw new NotFoundException(`Coding question #${submissionId} not found`);
    }
    return this.submissionRepository.save(submission);
  }

  async remove(submissionId: string): Promise<Submission> {
    const submission = await this.submissionRepository.findOne(submissionId);
    if (!submission) {
      throw new NotFoundException(`Coding question #${submissionId} not found`);
    }
    return this.submissionRepository.remove(submission);
  }
}
