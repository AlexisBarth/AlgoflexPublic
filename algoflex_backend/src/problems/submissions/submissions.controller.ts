import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard, Role, Roles, RolesGuard } from 'src/common';
import { Submission } from './entities/submission.entity';

@ApiTags('Submissions')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@Controller('problems/submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Get()
  findAll(@Req() req) {
    return this.submissionsService.findAll(req.user.uid);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.submissionsService.findOne(id, req.user.uid);
  }

  @Post()
  create(@Req() req, @Body() createSubmissionDto: CreateSubmissionDto) {
    return this.submissionsService.create(req.user.uid, createSubmissionDto);
  }

  @Put(':id')
  update(
    @Req() req,
    @Param('id') submissionId: string,
    @Body() updateSubmissionDto: UpdateSubmissionDto
  ) {
    return this.submissionsService.update(submissionId, req.user.uid, updateSubmissionDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.submissionsService.remove(id);
  }
}
