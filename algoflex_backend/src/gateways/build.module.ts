import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { CodingQuestionsService } from 'src/problems/coding-questions/coding-questions.service';
import { CodingQuestion } from 'src/problems/coding-questions/entities/coding-question.entity';
import { SubmissionsService } from 'src/problems/submissions/submissions.service';
import { Submission } from 'src/problems/submissions/entities/submission.entity';
import { User } from 'src/users/entity';
import { BuildGateway } from './compilation/build.gateway';
import { AutoCompleteGateway } from './autocomplete/autocomplete.gateway';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([CodingQuestion, Submission, User]),
  ],
  providers: [
    AutoCompleteGateway,
    BuildGateway,
    CodingQuestionsService,
    SubmissionsService,
  ],
})
export class BuildModule {}
