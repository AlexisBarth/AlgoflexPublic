import { Module } from '@nestjs/common';
import { UserMetaService } from './user-meta.service';
import { UserMetaController } from './user-meta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMeta } from './entities/user-meta.entity';
import { CodingQuestion } from 'src/problems/coding-questions/entities/coding-question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserMeta, CodingQuestion])],
  controllers: [UserMetaController],
  providers: [UserMetaService]
})
export class UserMetaModule {}
