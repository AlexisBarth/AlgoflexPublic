import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard, Role, Roles, RolesGuard } from 'src/common';
import { CodingQuestionsService } from './coding-questions.service';
import { CreateCodingQuestionDto } from './dto/create-coding-question.dto';
import { UpdateCodingQuestionDto } from './dto/update-coding-question.dto';
import { CodingQuestion } from './entities/coding-question.entity';

@ApiTags('Coding questions')
@Controller('problems/coding-questions')
export class CodingQuestionsController {
  constructor(private readonly codingQuestionsService: CodingQuestionsService) {}

  @Get()
  findAll() {
    return this.codingQuestionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.codingQuestionsService.findOne(id);
  }

  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiResponse({
    status: 200,
    type: CodingQuestion,
    description: 'Create a coding question.',
  })
  @ApiResponse({
    status: 409,
    description: 'Returns 409 when the problem already exists.',
  })
  @Post()
  create(@Body() createCodingQuestionDto: CreateCodingQuestionDto) {
    return this.codingQuestionsService.create(createCodingQuestionDto);
  }

  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCodingQuestionDto: UpdateCodingQuestionDto) {
    return this.codingQuestionsService.update(id, updateCodingQuestionDto);
  }

  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.codingQuestionsService.remove(id);
  }
}
