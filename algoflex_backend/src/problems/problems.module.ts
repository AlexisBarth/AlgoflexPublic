import { Module } from '@nestjs/common';
import { CodingQuestionsModule } from './coding-questions/coding-questions.module';
import { SubmissionsModule } from './submissions/submissions.module';

@Module({
  imports: [
    CodingQuestionsModule,
    SubmissionsModule,
  ],
})
export class ProblemsModule {}
