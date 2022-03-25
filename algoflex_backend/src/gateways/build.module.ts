import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BuildGateway } from './compilation/build.gateway';
import { AutoCompleteGateway } from './autocomplete/autocomplete.gateway';
import { CodingQuestionsService } from 'src/problems/coding-questions/coding-questions.service';
import { CodingQuestion } from 'src/problems/coding-questions/entities/coding-question.entity';
import { Submission } from 'src/problems/submissions/entities/submission.entity';
import { SubmissionsService } from 'src/problems/submissions/submissions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CodingQuestion, Submission]),
  ],
  providers: [
    AutoCompleteGateway,
    BuildGateway,
    CodingQuestionsService,
    SubmissionsService,
  ],
})
export class BuildModule {}
