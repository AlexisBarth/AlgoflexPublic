import { Module } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { ProblemsController } from './problems.controller';
import { Problem } from './entities/problem.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodingQuestionsModule } from './coding-questions/coding-questions.module';
import { SubmissionsModule } from './submissions/submissions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Problem]), CodingQuestionsModule, SubmissionsModule],
  controllers: [ProblemsController],
  providers: [ProblemsService],
})
export class ProblemsModule {}
