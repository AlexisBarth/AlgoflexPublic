import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { ApiTags } from '@nestjs/swagger';
import { BaseRequest, FirebaseAuthGuard, Role, Roles, RolesGuard } from 'src/common';

@ApiTags('Submissions')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@Controller('problems/submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Get()
  findAll(@Req() req: BaseRequest) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    return this.submissionsService.findAll(req.user.uid);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: BaseRequest) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    return this.submissionsService.findOne(id, req.user.uid);
  }

  @Post()
  create(@Req() req: BaseRequest, @Body() createSubmissionDto: CreateSubmissionDto) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    return this.submissionsService.create(req.user.uid, createSubmissionDto);
  }

  @Put(':id')
  update(
    @Req() req: BaseRequest,
    @Param('id') submissionId: string,
    @Body() updateSubmissionDto: UpdateSubmissionDto
  ) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    return this.submissionsService.update(submissionId, req.user.uid, updateSubmissionDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.submissionsService.remove(id);
  }
}
