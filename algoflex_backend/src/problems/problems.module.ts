import { Module } from '@nestjs/common';
import { CodingQuestionsModule } from './coding-questions/coding-questions.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { ThemesModule } from './themes/themes.module';

@Module({
  imports: [
    CodingQuestionsModule,
    SubmissionsModule,
    ThemesModule,
  ],
})
export class ProblemsModule {}
